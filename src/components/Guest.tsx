'use client';

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  useClerk
} from '@clerk/nextjs';

export default function Guest() {
  const clerk = useClerk();

  return (
    <div className='guest'>
      <h1>Welcome</h1>
      <p>Please Sign In to Manage Your Transactions</p>
      {/* <ClerkLoading>
        <p>Loading...</p>
      </ClerkLoading>
      <ClerkLoaded>
        <SignInButton />
      </ClerkLoaded> */}
      {!clerk.loaded ? <p>loading...</p> : <SignInButton />}
    </div>
  );
}
