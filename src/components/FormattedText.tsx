import React from 'react';

interface FormattedTextProps {
  text?: string | null;
  className?: string;
  asParagraphs?: boolean;
}

/**
 * Renderizza testo formattato supportando:
 * - Grassetto: **testo** oppure <b>testo</b> / <strong>testo</strong>
 * - Corsivo: *testo* oppure _testo_ oppure <i>testo</i> / <em>testo</em>
 * - Grassetto + Corsivo: ***testo*** oppure <b><i>testo</i></b>
 * - Ritorni a capo (\n e \n\n)
 */
export function formatInlineText(raw: string): React.ReactNode[] {
  if (!raw) return [];

  // Normalizza eventuali tag HTML in token markdown
  const normalized = raw
    .replace(/<strong\b[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b\b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em\b[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i\b[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Cattura ***grassetto-corsivo***, **grassetto**, *corsivo*, _corsivo_
  const tokenRegex = /(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|\*[^*]+?\*|_[^_]+?_)/g;
  const parts = normalized.split(tokenRegex);

  return parts.map((part, index) => {
    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      return (
        <strong key={index} className="font-medium text-white italic">
          {part.slice(3, -3)}
        </strong>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-medium text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length > 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length > 2)
    ) {
      return (
        <em key={index} className="italic text-neutral-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default function FormattedText({
  text,
  className = '',
  asParagraphs = true,
}: FormattedTextProps) {
  if (!text) return null;

  if (!asParagraphs) {
    return <span className={className}>{formatInlineText(text)}</span>;
  }

  // Divide su doppi ritorni a capo per generare paragrafi
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <div className={className}>
      {paragraphs.map((p, pIndex) => {
        // All'interno di ogni paragrafo, gestisce i singoli ritorni a capo con <br />
        const lines = p.split('\n');
        return (
          <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
            {lines.map((line, lIndex) => (
              <React.Fragment key={lIndex}>
                {formatInlineText(line)}
                {lIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
