export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  tag: string | null;
  in_stock: boolean;
  created_at: string;
}

export const PRODUCT_SLUGS = [
  "summit-shell-jacket",
  "alpine-hardshell-trousers",
  "expedition-pack-45l",
  "summit-shell-set",
] as const;

export function formatPrice(price: number): string {
  return `€${price}`;
}
