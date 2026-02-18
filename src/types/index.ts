export interface Customer {
  id: number;
  name: string;
  phone: string;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: number;
  customerId: number;
  packageId: number;
  price: number;
  status: string;
  createdAt: string;
}
