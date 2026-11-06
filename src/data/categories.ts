import {
  Flower2,
  LayoutGrid,
  Leaf,
  type LucideIcon,
  Snowflake,
  Sun,
} from "lucide-react";

type Category = { name: string; slug: string; icon: LucideIcon };

// "all" is a UI-only option (no filter). Products can only use the others.
export const categories = [
  { name: "All", slug: "all", icon: LayoutGrid },
  { name: "Spring", slug: "spring", icon: Flower2 },
  { name: "Summer", slug: "summer", icon: Sun },
  { name: "Fall", slug: "fall", icon: Leaf },
  { name: "Winter", slug: "winter", icon: Snowflake },
] as const satisfies readonly Category[];

// `as const` keeps each slug a literal type, so a typo in a product's
// `category` (or in a URL param) is a compile error.
export type CategorySlug = (typeof categories)[number]["slug"];
export type ProductCategorySlug = Exclude<CategorySlug, "all">;
