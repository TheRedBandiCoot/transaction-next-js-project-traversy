import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses and create a budget'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={roboto.className}>
          <Header />
          <main className='container'>{children}</main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
