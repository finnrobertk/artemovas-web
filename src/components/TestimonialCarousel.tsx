"use client";
import { useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  job?: string;
  // Kan senere utvides med stars hvis behov
}

const testimonials: Testimonial[] = [
  {
    quote: "Jeg har vært kunde hos Eva i over seks år og er alltid superfornøyd med resultatene! Jeg har fått både vippeextensions, PMU på leppene og andre behandlinger – og hver gang leverer hun med høy kvalitet og presisjon. Eva er utrolig dyktig, nøye og får meg alltid til å føle meg trygg og ivaretatt. Anbefales på det varmeste!",
    name: "Caroline",
  },
  {
    quote: "Veldig fornøyd, bra resultat og hyggelig ansatt! Kan anbefales",
    name: "Tiri M.",
  },
  {
    quote: "Jeg har vært hos Evgeniya flere ganger, og jeg blir alltid like fornøyd! Tidligere har jeg satt på vipper hos henne, og har alltid vært strålende fornøyd med både resultatet og servicen. Anbefales på det varmeste! 🌸",
    name: "Anine V.",
  },
  {
    quote: "Fantastisk dyktig behandler! Jeg tok vippeextensions og kunne ikke vært mer fornøyd med resultatet – både formen, fylden og holdbarheten er helt perfekt. Det er tydelig at hun har lang erfaring og stor kunnskap innen faget, spesielt med tanke på at hun har jobbet med vippeextensions siden 2013 og i tillegg holder kurs. Hun er nøye, profesjonell og veldig behagelig å være hos. Jeg følte meg trygg og godt ivaretatt gjennom hele behandlingen. Anbefales virkelig!",
    name: "Karina G.",
  },
  // Legg eventuelt til flere her
];

function StarRating({ stars = 5 }: { stars?: number }) {
  return (
    <div className="flex gap-1 mb-2 justify-center" aria-label={`${stars} av 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill={idx < stars ? "url(#starGradient)" : "#D1D5DB"/* Tailwind's gray-300 */}
          aria-hidden="true"
        >
          {/* Bare første stjerne definerer gradienten, men alle bruker samme id */}
          {idx === 0 && (
            <defs>
              <linearGradient id="starGradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fffde4"/>
                <stop offset="40%" stopColor="#ffe680"/>
                <stop offset="100%" stopColor="#ffc700"/>
              </linearGradient>
            </defs>
          )}
          <title>Stjerne</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.972c.3.92-.755 1.688-1.538 1.118l-3.378-2.454a1 1 0 00-1.175 0l-3.378 2.454c-.783.57-1.838-.198-1.539-1.118l1.288-3.972a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const prev = () => setIndex((i) => (i === 0 ? count - 1 : i - 1));
  const next = () => setIndex((i) => (i === count - 1 ? 0 : i + 1));

  return (
      <div className="w-full max-w-xl mx-auto py-6">
        <div className="bg-background rounded-lg shadow-lg px-6 py-12 relative flex flex-col items-center">
          <StarRating />
          <blockquote className="text-xl italic text-center mb-8 text-text-soft">
            “{testimonials[index].quote}”
          </blockquote>
          <div className="text-center">
            <span className="font-semibold text-text">{testimonials[index].name}</span>
            {testimonials[index].job && (
                <span className="text-sm text-text-soft block">{testimonials[index].job}</span>
            )}
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button
                onClick={prev}
                className="bg-primary text-white rounded-full p-2 hover:bg-primary/80 transition"
                aria-label="Forrige tilbakemelding"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
                onClick={next}
                className="bg-primary text-white rounded-full p-2 hover:bg-primary/80 transition"
                aria-label="Neste tilbakemelding"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flex gap-2 justify-center">
            {testimonials.map((_, idx) => (
                <span
                    key={idx}
                    className={`h-2 w-2 rounded-full ${idx === index ? "bg-primary" : "bg-text-soft/30"}`}
                />
            ))}
          </div>
        </div>
      </div>
  );
}