
export type CallbackVoid<T> = (data: T) => void;

export interface Product  {
  title: string;
  shortDescription: string;
}

export interface StoreItem {
  title: string;
  quantity: number;
}

export type Handler = (type: string) => void;
export type EventHandler = (e: Event, type: string) => void;