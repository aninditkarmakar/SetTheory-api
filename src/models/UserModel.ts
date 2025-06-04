import { Expose } from 'class-transformer';

export class UserModel {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string | null;

  @Expose({ name: 'email' })
  email: string | null;

  @Expose({ name: 'date_of_birth' })
  dateOfBirth: Date | null;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'modified_at' })
  modifiedAt: Date;

  public constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}

export interface UserModelCreateInput {
  firstName: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
}
