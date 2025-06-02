export interface UserModel {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  createdAt: Date;
  modifiedAt: Date;
}

export interface UserModelCreateInput {
  firstName: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
}
