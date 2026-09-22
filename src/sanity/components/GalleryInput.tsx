import React, { useState, useRef, useCallback } from 'react';
import {
  useClient,
  setIfMissing,
  insert,
  PatchEvent,
  ArrayOfObjectsInputProps,
} from 'sanity';
import { Card, Stack, Flex, Button, Text, Spinner, Box } from '@sanity/ui';
import { FolderIcon, ImagesIcon, UploadIcon, CheckmarkIcon } from '@sanity/icons';

// Estensioni supportate
const IMAGE_EXT_REGEX = /\.(jpe?g|png|webp|avif|gif|tiff?|heic|bmp)$/i;

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || IMAGE_EXT_REGEX.test(file.name);
}

async function traverseEntry(entry: any, files: File[]): Promise<void> {
  if (entry.isFile) {
    await new Promise<void>((resolve) => {
      entry.file(
        (file: File) => {
          if (isImageFile(file)) files.push(file);
          resolve();
        },
        () => resolve()
      );
    });
  } else if (entry.isDirectory) {
    const reader = entry.createReader();
    const readEntries = async (): Promise<any[]> => {
      return new Promise((resolve) => {
        reader.readEntries(
          (entries: any[]) => resolve(entries),
          () => resolve([])
        );
      });
    };

    let batch = await readEntries();
    while (batch && batch.length > 0) {
      for (const child of batch) {
        await traverseEntry(child, files);
      }
      batch = await readEntries();
    }
  }
}

// Lettura ricorsiva di cartelle e file trascinati tramite HTML5 DataTransfer
async function getFilesFromDataTransfer(dataTransfer: DataTransfer): Promise<File[]> {
  const files: File[] = [];

  // Se supportato webkitGetAsEntry (Chrome, Edge, Firefox, Safari)
  if (dataTransfer.items && dataTransfer.items.length > 0) {
    const queue: any[] = [];
    for (let i = 0; i < dataTransfer.items.length; i++) {
      const item = dataTransfer.items[i];
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
        if (entry) {
          queue.push(entry);
        } else {
          const f = item.getAsFile();
          if (f && isImageFile(f)) files.push(f);
        }
      }
    }

    for (const entry of queue) {
      await traverseEntry(entry, files);
    }

    if (files.length > 0) return files;
  }

  // Fallback standard a dataTransfer.files
  if (dataTransfer.files && dataTransfer.files.length > 0) {
    for (let i = 0; i < dataTransfer.files.length; i++) {
      const f = dataTransfer.files[i];
      if (isImageFile(f)) files.push(f);
    }
  }

  return files;
}

export default function GalleryInput(props: ArrayOfObjectsInputProps) {
  const { onChange } = props;
  const client = useClient({ apiVersion: '2024-03-01' });

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; filename: string }>({
    current: 0,
    total: 0,
    filename: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const filesInputRef = useRef<HTMLInputElement | null>(null);

  // Processa la coda di file e li carica in Sanity
  const uploadAndInsertFiles = useCallback(
    async (fileList: File[]) => {
      const imageFiles = fileList.filter(isImageFile);
      if (imageFiles.length === 0) return;

      setIsUploading(true);
      setSuccessMessage(null);
      setProgress({ current: 0, total: imageFiles.length, filename: '' });

      const uploadedItems: any[] = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        setProgress({
          current: i + 1,
          total: imageFiles.length,
          filename: file.name,
        });

        try {
          const asset = await client.assets.upload('image', file, {
            filename: file.name,
          });

          uploadedItems.push({
            _type: 'image',
            _key: Math.random().toString(36).substring(2, 12),
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          });
        } catch (err: any) {
          console.error(`Errore caricamento ${file.name}:`, err);
        }
      }

      if (uploadedItems.length > 0) {
        onChange(
          PatchEvent.from([
            setIfMissing([]),
            insert(uploadedItems, 'after', [-1]),
          ])
        );
        setSuccessMessage(`${uploadedItems.length} foto caricate e aggiunte alla galleria!`);
        setTimeout(() => setSuccessMessage(null), 6000);
      }

      setIsUploading(false);
    },
    [client, onChange]
  );

  // Gestione Drag & Drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer) {
        const files = await getFilesFromDataTransfer(e.dataTransfer);
        if (files.length > 0) {
          uploadAndInsertFiles(files);
        }
      }
    },
    [uploadAndInsertFiles]
  );

  // Gestione input selettore cartella
  const handleFolderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        uploadAndInsertFiles(files);
      }
      e.target.value = '';
    },
    [uploadAndInsertFiles]
  );

  // Gestione input selettore file multipli
  const handleFilesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        uploadAndInsertFiles(files);
      }
      e.target.value = '';
    },
    [uploadAndInsertFiles]
  );

  return (
    <Stack space={3}>
      {/* Box di caricamento rapido e Drag & Drop */}
      <Card
        padding={4}
        radius={2}
        border
        tone={isDragging ? 'primary' : 'default'}
        style={{
          borderStyle: isDragging ? 'dashed' : 'solid',
          borderWidth: 2,
          backgroundColor: isDragging ? 'var(--card-bg-color)' : undefined,
          transition: 'all 0.2s ease',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Flex direction="column" align="center" gap={3}>
          {isUploading ? (
            <Flex align="center" gap={3}>
              <Spinner />
              <Box>
                <Text size={2} weight="semibold">
                  Caricamento in corso: {progress.current} / {progress.total} foto...
                </Text>
                <Text size={1} muted style={{ marginTop: 4 }}>
                  {progress.filename}
                </Text>
              </Box>
            </Flex>
          ) : (
            <>
              <Flex align="center" gap={2}>
                <UploadIcon style={{ fontSize: 24, opacity: 0.8 }} />
                <Text size={2} weight="semibold">
                  Caricamento Multiplo & Cartelle
                </Text>
              </Flex>

              <Text size={1} muted align="center" style={{ maxWidth: 460 }}>
                Trascina qui direttamente una <strong>cartella</strong> o <strong>più immagini</strong> dal tuo computer, oppure usa i pulsanti qui sotto:
              </Text>

              {/* Pulsanti Azione */}
              <Flex gap={2} wrap="wrap" justify="center">
                <Button
                  icon={FolderIcon}
                  text="📁 Carica intera cartella"
                  tone="primary"
                  mode="default"
                  onClick={() => folderInputRef.current?.click()}
                  disabled={isUploading}
                />
                <Button
                  icon={ImagesIcon}
                  text="🖼️ Seleziona più foto"
                  mode="ghost"
                  onClick={() => filesInputRef.current?.click()}
                  disabled={isUploading}
                />
              </Flex>

              {/* Hidden file inputs */}
              <input
                ref={folderInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                multiple
                style={{ display: 'none' }}
                onChange={handleFolderChange}
              />

              <input
                ref={filesInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFilesChange}
              />
            </>
          )}

          {successMessage && (
            <Card padding={2} radius={2} tone="positive">
              <Flex align="center" gap={2}>
                <CheckmarkIcon />
                <Text size={1} weight="medium">
                  {successMessage}
                </Text>
              </Flex>
            </Card>
          )}
        </Flex>
      </Card>

      {/* Render della griglia Sanity predefinita (mostra le foto caricate, permette di riordinarle, eliminarle o inserire didascalie) */}
      <Box>{props.renderDefault(props)}</Box>
    </Stack>
  );
}
