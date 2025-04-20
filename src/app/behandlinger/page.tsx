import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FancySeparator } from "@/components/Separator";

const servicesQuery = groq`*[_type == "behandling"] | order(category->order asc) {
  _id,
  title,
  description,
  price,
  duration,
  "category": category->title,
  "categorySlug": category->slug.current,
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/eyelash-bg.jpg"
            alt="Våre Behandlinger"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-sans font-bold mb-4 text-white">
            Våre Behandlinger
          </h1>
          <p className="text-xl text-text-soft max-w-2xl mx-auto px-4">
            Opplev profesjonell skjønnhetsbehandling med våre eksklusive behandlinger
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {Object.entries(servicesByCategory).map(([category, categoryServices], index) => (
            <div key={category} className="mb-16 last:mb-0">
              <FancySeparator text={category.charAt(0).toUpperCase() + category.slice(1)} className="mb-12" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service) => (
                  <div
                    key={service._id}
                    className="card group hover:scale-[1.02] transition-all duration-300"
                  >
                    {service.imageUrl && (
                      <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <h3 className="text-xl font-sans font-semibold text-text">
                        {service.title}
                      </h3>
                      <p className="text-text-soft/80">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-secondary font-semibold text-lg">
                          {service.price} kr
                        </span>
                        <span className="text-text-soft text-sm">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-text mb-6">
              Klar til å bestille time?
            </h2>
            <p className="text-text-soft mb-8 text-lg">
              Ta kontakt med oss for å booke din neste behandling eller still oss spørsmål om våre behandlinger.
            </p>
            <Link
              href="/kontakt"
              className="btn-primary text-lg inline-flex items-center group"
            >
              Book Time
              <svg 
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gold-gradient rotate-12 transform scale-150" />
        </div>
      </section>
    </div>
  );
} 