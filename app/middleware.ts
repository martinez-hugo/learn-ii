// middleware.ts
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = getAuth(req);
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Public: /, /sign-in, /sign-up, /favicon, /_next
  const isPublic = /^\/($|sign-in|sign-up|_next|favicon)/.test(pathname);
  if (isPublic) return NextResponse.next();

  // Besoin d’être connecté pour le reste
  if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url));

  // Rôles (on utilisera publicMetadata.role à l’étape suivante)
  const role = (sessionClaims?.publicMetadata as any)?.role as 'ADMIN' | 'AGENT' | 'CREATOR' | undefined;

  // Garde-fous RBAC (basique pour démarrer)
  if (pathname.startsWith('/admin') && role !== 'ADMIN')
    return NextResponse.redirect(new URL('/dashboard', req.url));
  if (pathname.startsWith('/agent') && !['ADMIN','AGENT'].includes(role || ''))
    return NextResponse.redirect(new URL('/dashboard', req.url));

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // tout sauf assets
    '/', '/(api|trpc)(.*)',
  ],
};
