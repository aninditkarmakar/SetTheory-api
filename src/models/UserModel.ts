export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreateInput = {
  firstname?: string;
  lastname?: string;
  email?: string;
  dateOfBirth?: Date;
};

export type UserUpdateInput = {
  firstname?: string;
  lastname?: string;
  email?: string;
  dateOfBirth?: Date;
};
