import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret =
      req.nextUrl.searchParams.get('secret') ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    // Se un segreto è configurato nell'ambiente, verificalo
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Token segreto non valido' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { _type, slug } = body;

    // Revalida la homepage e la pagina chi-sono
    revalidatePath('/');
    revalidatePath('/chi-sono');

    // Revalida i tag di cache
    revalidateTag('project');
    revalidateTag('siteSettings');

    // Se è stato aggiornato un progetto specifico con slug
    if (_type === 'project' && slug?.current) {
      revalidatePath(`/progetti/${slug.current}`);
      revalidateTag(`project:${slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Revalidazione completata con successo per tipo: ${_type || 'tutti'}`,
    });
  } catch (err: any) {
    console.error('Errore durante la revalidazione:', err);
    return NextResponse.json(
      { message: 'Errore interno durante la revalidazione', error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 'online',
    message: 'Endpoint di revalidazione attivo. Usa il metodo POST con il secret per attivare la revalidazione.',
  });
}
