export interface Room {
  id: string;
  name: string;
  owner: string;
  users: string[];
  orders: Order[];
}

export interface Order {
  plateId: string;
  variant?: 'A' | 'B';
  notes?: string;
  quantity: number;
  ownerName: string;
}
