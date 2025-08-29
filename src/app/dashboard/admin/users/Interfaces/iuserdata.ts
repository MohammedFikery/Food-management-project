export interface IUserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface IUserdata {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  group: IUserGroup;
  creationDate: string;
  modificationDate: string;
}

export interface IUser {
  pageNumber: number;
  pageSize: number;
  data: IUserdata[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
