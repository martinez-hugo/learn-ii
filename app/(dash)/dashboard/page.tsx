import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId, sessionClaims } = await auth();
  const user = await currentUser();
  const role = (sessionClaims?.publicMetadata as any)?.role as
    | 'ADMIN'
    | 'AGENT'
    | 'CREATOR'
    | undefined;


  return (
    <div className="space-y-2">
      <div className="text-lg">Bienvenue sur votre tableau de bord{user?.firstName ? `, ${user.firstName}` : ''}.</div>
      <div className="text-sm text-muted-foreground">UserId: {userId}</div>
      <div className="text-sm text-muted-foreground">Rôle: {role ?? '—'}</div>
    </div>
  );
}