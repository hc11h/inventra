'use client';

import { useQuery, gql } from '@apollo/client';
import { formatGreeting } from '@my-app/utils';

const GET_HELLO_QUERY = gql`
  query GetHello {
    getHello
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_HELLO_QUERY);

  if (loading) return <p>Loading from API...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data?.getHello}</h1>
      <p>{formatGreeting('Next.js Client')}</p>
    </div>
  );
}