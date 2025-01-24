
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../interface";

const ProductCart = ({ product }: { product: Product }) => {
  if (!product) {
    return <div className="text-red-500">Product not found</div>;
  }

  return (
    <div
      key={product.id}
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300 w-full max-w-[300px] mx-auto"
    >
      <Link href={`/products/${product.id}`} aria-label={`View details of ${product.name}`}>
        <div className="relative w-full h-64">
          {/* Image */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-black text-lg font-bold">${product.originalPrice}</p>

        {/* Rating Section */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < Math.round(product.rating.rate) ? "gold" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.25l6.172 3.83-1.638-7.07 5.466-4.86-7.22-.62L12 2.25l-2.78 6.28-7.22.62 5.466 4.86-1.638 7.07L12 17.25z"
              />
            </svg>
          ))}
          <span className="ml-2 text-gray-600 text-sm">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
