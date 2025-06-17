export type PartialExisting<T, K extends keyof T> = Pick<T, K> & Partial<T>;
