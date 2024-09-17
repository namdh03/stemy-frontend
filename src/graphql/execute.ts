import { SuccessResponse } from '~types/response.type';

import http from '../utils/http';

import type { TypedDocumentString } from './graphql';

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

export default execute;
