import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import { Service } from "@/sanity/types";

const servicesQuery = groq`
  *[_type == "service"] {
    _id,
    title,
    description,
    price,
    category-> {
      _id,
      title
    }
  } | order(category->title asc, title asc)
`;

export default async function ServicesPage() {
  const services = await client.fetch<Service[]>(servicesQuery);

  // Group services by category
  const servicesByCategory = services.reduce((acc: Record<string, Service[]>, service) => {
    const category = service.category.title;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Våre Tjenester
        </h1>

        {Object.entries(servicesByCategory).map(([category, services]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text/80 mb-4">{service.description}</p>
                  <p className="text-secondary font-semibold">
                    {service.price} kr
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Klar for en ny deg?
          </h2>
          <Link
            href="/kontakt"
            className="btn-primary text-lg px-8 py-3 rounded-full"
          >
            Book time nå
          </Link>
        </div>
      </div>
    </div>
  );
} 