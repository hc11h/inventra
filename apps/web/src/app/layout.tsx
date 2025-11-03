'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo';
import { Button } from '@my-app/ui';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <main>
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}