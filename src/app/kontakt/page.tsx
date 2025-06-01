"use client";
import React, { useState } from "react";

export default function Kontakt() {
  const [success, setSuccess] = useState(false);

  // Her kan du sende data videre til API/backend etter behov!
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Implementer evt. faktisk innsending her
    setSuccess(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="bg-background dark:bg-background-dark p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gold text-center">Kontakt Oss</h1>
        <p className="text-soft text-center mb-8">
          Har du spørsmål, ønsker å bestille time eller ønsker mer informasjon? Fyll ut skjemaet så tar vi kontakt!
        </p>
        
        {success ? (
          <div className="text-green-500 text-center font-semibold">
            Takk for din henvendelse! Vi svarer deg så snart som mulig.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="navn" className="block text-text mb-2">Navn <span className="text-gold">*</span></label>
              <input
                required
                type="text"
                id="navn"
                name="navn"
                className="w-full px-4 py-3 rounded border border-border bg-background-light text-text focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="epost" className="block text-text mb-2">E-post <span className="text-gold">*</span></label>
              <input
                required
                type="email"
                id="epost"
                name="epost"
                className="w-full px-4 py-3 rounded border border-border bg-background-light text-text focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="telefon" className="block text-text mb-2">Telefonnummer <span className="text-soft text-xs">(valgfritt)</span></label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                className="w-full px-4 py-3 rounded border border-border bg-background-light text-text focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="beskjed" className="block text-text mb-2">Hva gjelder henvendelsen?</label>
              <textarea
                required
                id="beskjed"
                name="beskjed"
                rows={4}
                className="w-full px-4 py-3 rounded border border-border bg-background-light text-text focus:outline-none focus:border-gold resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded font-semibold mt-2 text-lg"
            >
              Send henvendelse
            </button>
          </form>
        )}
      </div>
    </div>
  );
}