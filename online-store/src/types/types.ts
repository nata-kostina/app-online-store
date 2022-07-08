
export type CallbackVoid<T> = (data: T) => void;

export interface IProduct {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  color: string;
  sizes: string[];
  year: string;
  isBestseller: boolean;
  imgUrl: string;
  price: string;
}

export interface StoreItem {
  title: string;
  quantity: number;
}

export type Handler = (type: string) => void;
export type EventHandler = (e: Event, type: string) => void;

export interface ICartProduct {
  id: string;
  title: string;
  quantity: number;
}