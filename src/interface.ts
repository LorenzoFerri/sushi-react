export interface Room {
  id: string;
  name: string;
  owner: string;
  users: string[];
  orders: Order[];
}

export interface Order {
  ownerName: string | undefined | null;
  ownerId: string | undefined;
  plateId: number;
  quantity: number;
  variant?: 'A' | 'B';
  noAvocado?: boolean;
  completed: boolean;
}
