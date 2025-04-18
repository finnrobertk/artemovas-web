import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/eyelash-bg.jpg"
            alt="Artemova&apos;s Beauty Salon"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-left text-white px-4 w-1/2 pl-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
            Velkommen til Artemova&apos;s Beauty
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Din profesjonelle skjønnhetssalong for øyevipper, ansiktsbehandling og permanent makeup
          </p>
          <Link
            href="/tjenester"
            className="btn-primary"
          >
            Book time
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Våre Tjenester</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Øyevipper</h3>
              <p className="text-text">
                Profesjonell øyevippeforlengelse og styling for naturlige og vakre øyevipper.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Ansiktsbehandling</h3>
              <p className="text-text">
                Skreddersydde ansiktsbehandlinger for din hudtype og dine behov.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Permanent Makeup</h3>
              <p className="text-text">
                Profesjonell permanent makeup for naturlige og varige resultater.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Om Oss</h2>
            <p className="text-text mb-8">
              Hos Artemova&apos;s Beauty er vi dedikert til å gi deg den beste skjønnhetsbehandlingen. 
              Med vår erfaring og ekspertise sikrer vi at du får resultater du vil elske.
            </p>
            <Link
              href="/kontakt"
              className="btn-secondary text-lg px-8 py-3 rounded-full"
            >
              Kontakt Oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
