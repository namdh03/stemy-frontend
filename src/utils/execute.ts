import { SuccessResponse } from '~types/response.type';

import type { TypedDocumentString } from '../graphql/graphql';

import http from './http';

const execute = <TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<{ data: TResult }> =>
  http
    .post<SuccessResponse<TResult>>('/graphql', {
      query: query,
      variables,
    })
    .then((response) => response.data);

export const executeWithFormData = <TResult>(formData: FormData): Promise<{ data: TResult }> => {
  return http
    .post<SuccessResponse<TResult>>('/graphql', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
};

export default execute;
