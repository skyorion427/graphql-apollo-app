import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Bank = {
  __typename?: 'Bank';
  _id: Scalars['ID'];
  name: Scalars['String'];
  branchName: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type CreateBankInput = {
  name: Scalars['String'];
  branchName: Scalars['String'];
};

export type CreateEmployeeInput = {
  name: Scalars['String'];
  number: Scalars['Int'];
  accountHolder: Scalars['String'];
  accountType?: Maybe<Scalars['String']>;
  accountNumber: Scalars['Int'];
  bank: Scalars['ID'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Int'];
  accountHolder: Scalars['String'];
  accountType?: Maybe<Scalars['String']>;
  accountNumber: Scalars['Int'];
  bank?: Maybe<Bank>;
};

export type EmployeesInput = {
  field?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  operator?: Maybe<Operator>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBank: Bank;
  updateBank: Bank;
  deleteBank: Bank;
  createEmployee: Employee;
  updateEmployee: Employee;
  deleteEmployee: Employee;
};

export type MutationCreateBankArgs = {
  bank?: Maybe<CreateBankInput>;
};

export type MutationUpdateBankArgs = {
  _id: Scalars['String'];
  bank?: Maybe<UpdateBankInput>;
};

export type MutationDeleteBankArgs = {
  _id: Scalars['String'];
};

export type MutationCreateEmployeeArgs = {
  employee?: Maybe<CreateEmployeeInput>;
};

export type MutationUpdateEmployeeArgs = {
  _id: Scalars['String'];
  employee?: Maybe<UpdateEmployeeInput>;
};

export type MutationDeleteEmployeeArgs = {
  _id: Scalars['String'];
};

export enum Operator {
  Gte = 'gte',
  Lte = 'lte',
  Eq = 'eq',
  Like = 'like',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  banks: Array<Bank>;
  employees: Array<Employee>;
};

export type QueryEmployeesArgs = {
  filters?: Maybe<Array<Maybe<EmployeesInput>>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  sort?: Maybe<Scalars['String']>;
};

export type UpdateBankInput = {
  name?: Maybe<Scalars['String']>;
  branchName?: Maybe<Scalars['String']>;
};

export type UpdateEmployeeInput = {
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  accountHolder?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['Int']>;
  bank?: Maybe<Scalars['ID']>;
};
