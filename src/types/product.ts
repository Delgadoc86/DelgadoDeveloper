export type ProductType = "app" | "servicio" | "mantenimiento" | "catalogo" | "otro";
export type ProductFrequency = "mensual" | "semestral" | "anual" | "unico";

export const PRODUCT_TYPES: ProductType[] = [
  "app",
  "servicio",
  "mantenimiento",
  "catalogo",
  "otro",
];
export const PRODUCT_FREQUENCIES: ProductFrequency[] = [
  "mensual",
  "semestral",
  "anual",
  "unico",
];

export interface ProductRecord {
  id: string;
  name: string;
  type: ProductType;
  suggestedPrice: number | null;
  suggestedFrequency: ProductFrequency | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
