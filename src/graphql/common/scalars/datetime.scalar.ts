import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'DateTime custom scalar type';

  parseValue(value: string): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    throw new Error(
      `DateTimeScalar can only parse string values, received: ${ast.kind}`,
    );
  }
}
