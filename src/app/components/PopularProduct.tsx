

"use client";

import Card from "./ProductCart";
import ViewCollectionButton from "./ViewCollectionButton";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../interface";
import { useEffect, useState } from "react";

const PopularProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
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

        const result: Product[] = await client.fetch(query);
        setProducts(result.slice(0, 4)); // Limit to the first 4 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-y-2 mt-10 px-5 md:px-10 xl:px-0">
      <h1 className="clashDisplay md:text-[2rem] text-[20px] font-[400px] md:self-center self-start mb-3 xl:self-start">
        Our Popular Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"> {/* Adjusted grid for 4 items max */}
        {products.map((product) => (
          <div key={product.slug}>
            <Card product={product} />
          </div>
        ))}
      </div>

      <ViewCollectionButton />
    </main>
  );
};

export default PopularProduct;