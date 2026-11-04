import { availableCategories } from "@/data/constants";
import { products } from "@/data/data";
import { sortProducts } from "@/utils/sort-products";
import { BannerCarousel } from "./_modules/components/banner-carousel";
import ViewCollection from "./_modules/components/view-collection";
import LatestProductSection from "./_modules/sections/latest-product-section";

const LATEST_COUNT = 8;

export default function Home() {
  const latestProducts = sortProducts(products, "newest").slice(
    0,
    LATEST_COUNT,
  );

  // Icons are components, which can't be passed from a server component to a
  // client component, so only send the serialisable parts.
  const categories = availableCategories.map(({ name, slug }) => ({
    name,
    slug,
  }));

  return (
    <div className="space-y-8">
      <BannerCarousel />

      <LatestProductSection categories={categories} products={latestProducts} />

      <ViewCollection />
    </div>
  );
}
