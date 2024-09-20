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
  phoneNumber: string;
  loyalityPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerType {
  fullName: string;
  phoneNumber: string;
}
    
export interface CreatePurchaseType {
  customerPhoneNumber: string;
  numberOfItems: number;
  totalAmount: number;
}

export interface loginTypes {
  email: string;
  password: string;
}
