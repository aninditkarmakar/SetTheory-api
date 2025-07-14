import { CreateTagInput } from '../graphql';

export class CreateTagDto extends CreateTagInput {
  declare name: string;
}
