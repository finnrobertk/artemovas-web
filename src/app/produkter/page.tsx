import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/sanity/types";

const productsQuery = groq`
  *[_type == "product"] {
    _id,
    title,
    description,
    price,
    category-> {
      _id,
      title
    },
    image {
      asset-> {
        url
      }
    }
  } | order(category->title asc, title asc)
`;

export default async function ProductsPage() {
  const products = await client.fetch<Product[]>(productsQuery);

  // Group products by category
  const productsByCategory = products.reduce((acc: Record<string, Product[]>, product) => {
    const category = product.category.title;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Våre Produkter
        </h1>

        {Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-accent rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image.asset.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {product.title}
                    </h3>
                    <p className="text-text/80 mb-4">{product.description}</p>
                    <p className="text-secondary font-semibold">
                      {product.price} kr
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Kommer snart!
          </h2>
          <p className="text-text mb-8">
            Vi jobber med å legge til flere produkter. Sjekk tilbake snart for mer.
          </p>
          <Link
            href="/kontakt"
            className="btn-primary text-lg px-8 py-3 rounded-full"
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </div>
  );
} 