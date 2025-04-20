import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { CategorySection } from "@/components/CategorySection";

// Updated query to get categories with their behandlinger
const servicesQuery = groq`*[_type == "kategori"] | order(order asc) {
  _id,
  title,
  "behandlinger": *[_type == "behandling" && references(^._id)] | order(title asc) {
    _id,
    title,
    description,
    price,
    duration
  }
}`;

interface Behandling {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

interface Category {
  _id: string;
  title: string;
  behandlinger: Behandling[];
}

export default async function BehandlingerPage() {
  const categories = await client.fetch<Category[]>(servicesQuery);

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
            Opplev profesjonell skjønnhetsbehandling med våre eksklusive tjenester
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {categories.map((category) => (
            <CategorySection key={category._id} category={category} />
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
              Ta kontakt med oss for å booke din neste behandling eller still oss spørsmål om våre tjenester.
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