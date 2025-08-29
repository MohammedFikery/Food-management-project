export interface ICategoryData {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface ICategory {
  pageNumber: number;
  pageSize: number;
  data: ICategoryData[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
