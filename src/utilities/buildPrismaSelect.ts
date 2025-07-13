import { FieldNode, Kind } from 'graphql';

/**
 * Builds a Prisma select object from a GraphQL FieldNode selection, including only scalar fields (no nested relations).
 * @param selection The GraphQL FieldNode to process
 * @returns A Prisma select object
 */
export function buildPrismaSelect(selection: FieldNode): Record<string, any> {
  const fields: Record<string, any> = {};
  if (!selection.selectionSet) return fields;
  for (const node of selection.selectionSet.selections) {
    if (node.kind === Kind.FIELD && node.name && node.name.value) {
      // Only include fields that do NOT have a selectionSet (i.e., scalars)
      if (!('selectionSet' in node && node.selectionSet)) {
        fields[node.name.value] = true;
      }
    }
  }
  // Optionally remove debug log
  // console.log(JSON.stringify(fields, null, 2));
  return fields;
}
