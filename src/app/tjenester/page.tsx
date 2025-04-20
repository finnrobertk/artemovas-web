import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const servicesQuery = groq`*[_type == "service"] | order(category asc) {
  _id,
  title,
  description,
  price,
  duration,
  category,
  "imageUrl": image.asset->url
}`;

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
}

export default async function ServicesPage() {
  const services = await client.fetch<Service[]>(servicesQuery);

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-sans font-bold font-thin text-gold uppercase mb-8">Våre tjenester</h1>
      
      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-sans text-primary-default mb-6">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((service) => (
              <div
                key={service._id}
                className="bg-accent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {service.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-default mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-default/80 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-default font-semibold">
                      {service.price} kr
                    </span>
                    <span className="text-text-default">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-primary-default mb-4">
          Ready to Book?
        </h2>
        <p className="text-text-default mb-6">
          Contact us to schedule your appointment or ask any questions.
        </p>
        <Link
          href="/kontakt"
          className="inline-block bg-primary-default text-white px-8 py-3 rounded-lg hover:bg-primary-default/90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
} 