import checkUser from '@/libs/checkUser';
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs';

export default async function Header() {
  const user = await checkUser();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <h2>Expense Tracker</h2>
        <div>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
          <ClerkLoading>{user && <p>Loading...</p>}</ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </nav>
  );
}
