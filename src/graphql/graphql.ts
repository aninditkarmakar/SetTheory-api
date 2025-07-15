
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AUTH_PROVIDER {
    GOOGLE = "GOOGLE"
}

export class CreateTagInput {
    name: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract tags(): TagWithoutConnections[] | Promise<TagWithoutConnections[]>;

    abstract tag(name: string): Tag | Promise<Tag>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createTag(userId: string, createTagInput?: Nullable<CreateTagInput>): Tag | Promise<Tag>;
}

export class TagUsersConnection {
    __typename?: 'TagUsersConnection';
    edges: Nullable<TagUsersEdge>[];
}

export class TagUsersEdge {
    __typename?: 'TagUsersEdge';
    cursor: string;
    node: User;
}

export class Tag {
    __typename?: 'Tag';
    id: string;
    name: string;
    usersConnection?: TagUsersConnection;
}

export class TagWithoutConnections {
    __typename?: 'TagWithoutConnections';
    id: string;
    name: string;
}

export class User {
    __typename?: 'User';
    id: string;
    first_name: string;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    date_of_birth?: Nullable<GraphQLISODateTime>;
    created_at: GraphQLISODateTime;
    modified_at: GraphQLISODateTime;
    tagsConnection?: UserTagsConnection;
    identities: Identity[];
}

export class UserTagsConnection {
    __typename?: 'UserTagsConnection';
    edges: Nullable<UserTagsEdge>[];
}

export class UserTagsEdge {
    __typename?: 'UserTagsEdge';
    cursor: string;
    node: TagWithoutConnections;
}

export class Identity {
    __typename?: 'Identity';
    id: string;
    user_id: string;
    provider_id: string;
    auth_provider: AUTH_PROVIDER;
    created_at: GraphQLISODateTime;
    user: User;
}

export type GraphQLISODateTime = any;
type Nullable<T> = T | null;
