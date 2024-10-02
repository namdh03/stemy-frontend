import type { CodegenConfig } from '@graphql-codegen/cli';

const baseURL = 'http://localhost:8081' + '/graphql';

const config: CodegenConfig = {
  schema: baseURL,
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        scalars: {
          File: 'File',
        },
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
