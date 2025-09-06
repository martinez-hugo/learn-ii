'use client';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
export default function UserNav() {
  return (
    <>
      <SignedIn><UserButton appearance={{ elements: { userButtonPopoverFooter: 'hidden' } }} /></SignedIn>
      <SignedOut><SignInButton /></SignedOut>
    </>
  );
}