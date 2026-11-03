import products from "@/data/product";
import { BannerCarousel } from "./_modules/components/banner-carousel";
import LatestProductSection from "./_modules/sections/latest-product-section";
import ViewCollection from "./_modules/components/view-collection";
import { categories } from "@/data/categories";

export default function Home() {
  const collectionData = categories

  const productData = products;
  return (
    <div className="space-y-8">
      <BannerCarousel />

      <LatestProductSection
        collectionData={collectionData}
        products={productData}
      />

      <ViewCollection />
    </div>
  );
}
