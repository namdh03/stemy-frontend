import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: 'https://stemyb.thanhf.dev/graphql',
  schema: 'http://localhost:8081/graphql',
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
