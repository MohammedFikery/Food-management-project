export interface IRecipesData {
  pageNumber: number;
  pageSize: number;
  data: IRecipes[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface IRecipes {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: Category[];
  tag: Tag;
}

export interface Category {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
