import { RouterProvider } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { graphql } from '~graphql';
import router from '~routes';
import execute from '~utils/execute';

const UserQuery = graphql(`
  query User($id: Int!) {
    user(id: $id) {
      id
      fullName
      email
    }
  }
`);

function App() {
  const { data } = useQuery({
    queryKey: ['post'],
    queryFn: () => execute(UserQuery, { id: 10 }),
    select: (data) => data.data,
  });

  console.log('data :>> ', data);

  return <RouterProvider router={router} />;
}

export default App;
