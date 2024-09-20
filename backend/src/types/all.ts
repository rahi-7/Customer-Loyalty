export interface UserTypes {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserType {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CustomerType {
  fullName: string;
  phoneNumer: string;
  loyalityPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface loginTypes {
  email: string;
  password: string;
}
