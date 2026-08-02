export type CustomerType = "recurrente" | "ocasional";
export type CustomerStatus = "activo" | "inactivo";

export const CUSTOMER_TYPES: CustomerType[] = ["recurrente", "ocasional"];
export const CUSTOMER_STATUSES: CustomerStatus[] = ["activo", "inactivo"];

export interface CustomerRecord {
  id: string;
  name: string;
  businessName?: string;
  phone: string;
  phoneRaw: string;
  email?: string;
  taxId?: string;
  type: CustomerType;
  status: CustomerStatus;
  notes?: string;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
