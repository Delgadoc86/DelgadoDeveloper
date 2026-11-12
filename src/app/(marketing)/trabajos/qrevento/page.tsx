import { ProductCasePage } from "@/features/products/components/product-case-page";
import { getProduct } from "@/features/products/data/products";
import { buildProductMetadata } from "@/features/products/product-metadata";

const product = getProduct("qrevento");

export const metadata = buildProductMetadata(product);

export default function Page() {
  return <ProductCasePage product={product} />;
}
