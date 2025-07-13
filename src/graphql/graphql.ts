
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract tags(): Tag[] | Promise<Tag[]>;

    abstract tag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Tag {
    id: string;
    name: string;
    users: User[];
}

export class User {
    id: string;
    first_name: string;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    date_of_birth?: Nullable<DateTime>;
    created_at: DateTime;
    modified_at: DateTime;
    tags: Tag[];
}

export type DateTime = Date;
type Nullable<T> = T | null;
