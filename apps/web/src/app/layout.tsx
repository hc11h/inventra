'use client'; 

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo';
import { Button } from '@my-app/ui';

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
            <Button label="Click Me (from shared UI)" onClick={() => alert('Button clicked!')} />
            <hr />
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}