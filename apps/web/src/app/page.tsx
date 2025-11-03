'use client';

import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { formatGreeting } from '@my-app/utils';
import { Button, Notification } from '@my-app/ui';

const GET_HELLO_QUERY = gql`
  query GetHello {
    getHello
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_HELLO_QUERY);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleButtonClick = () => {
    setNotificationMessage('Everything is working perfectly!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-4">
      <main className="bg-white rounded-2xl shadow-lg p-12 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Your Monorepo
        </h1>

        <div className="text-gray-600 mb-8 min-h-[2rem]">
          {loading && <p className="animate-pulse text-gray-400">Loading message...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {data && <p className="font-medium">{data.getHello}</p>}
        </div>

        <Button label={formatGreeting('Test the UI')} onClick={handleButtonClick} />
      </main>

      {notificationMessage && (
        <Notification message={notificationMessage} />
      )}
    </div>
  );
}
