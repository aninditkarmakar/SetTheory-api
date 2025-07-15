import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
definitionsFactory.generate({
  typePaths: ['./src/graphql/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql/graphql.ts'),
  outputAs: 'class',
  emitTypenameField: true,
});
