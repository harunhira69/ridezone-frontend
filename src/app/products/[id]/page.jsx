import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetails(props) {
  const { id } = await props.params;

  const API_URL = process.env.API_URL;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center py-28 text-gray-500">
        Product not found
      </div>
    );
  }

  const product = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/products">
        <button className="mb-10 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-xl shadow-sm">
          ← Back to Products
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="w-full h-80 md:h-[480px] relative rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-3">{product.title}</h1>

          <p className="text-gray-600 text-lg mb-1">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>

          <p className="text-gray-600 text-lg mb-1">
            <span className="font-semibold">Engine CC:</span> {product.engineCC} cc
          </p>

          <p className="text-gray-600 text-lg mb-1">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>

          <p className="text-gray-600 text-lg mb-5">
            <span className="font-semibold">Release Date:</span> {product.date}
          </p>

          {/* Short Description */}
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-700 mb-5">{product.shortDescription}</p>

          {/* Full Description */}
          <h2 className="text-2xl font-semibold mb-2">Full Details</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.fullDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
