import ProductGrid from "@/app/components/ProductGrid";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../interface";


export const revalidate = 2;
export default async function CutleryPage() {
  try {
    const query = `*[_type == "product" && category->name == 'cutlery']{
      name,
      tags,
      price,
      stock,
      dimensions,
      id,
      description,
      discount,
      originalPrice,
      "categoryName": category->name,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      rating 
    }`;

    const products: Product[] = await client.fetch(query);

    return <ProductGrid products={products} title="Cutlery Collection" />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Error fetching products. Please try again later.
        </p>
      </div>
    );
  }
}
