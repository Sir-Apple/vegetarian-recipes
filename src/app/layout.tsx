// src/app/layout.tsx
import './globals.css';
import ApolloWrapper from '@/components/ApolloWrapper';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-recipe min-h-screen text-gray-900 relative">
        <ApolloWrapper>
          <Navbar />
          <main className="relative z-10 px-4 py-8">{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
