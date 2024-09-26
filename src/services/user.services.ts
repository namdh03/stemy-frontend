import { graphql } from '~graphql';

export const LoginQuery = graphql(`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`);

export const GetMeQuery = graphql(`
  query MeQuery {
    me {
      email
      fullName
      id
      phone
      role
      status
    }
  }
`);
