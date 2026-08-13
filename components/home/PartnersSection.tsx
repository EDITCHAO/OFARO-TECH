"use client";

export default function PartnersSection() {
  const partners = [
    { id: "1", name: "Microsoft", logo: "MS" },
    { id: "2", name: "AWS", logo: "AWS" },
    { id: "3", name: "Google Cloud", logo: "GC" },
    { id: "4", name: "Oracle", logo: "OR" },
    { id: "5", name: "Cisco", logo: "CS" },
    { id: "6", name: "IBM", logo: "IBM" },
    { id: "7", name: "Dell", logo: "DL" },
    { id: "8", name: "HP", logo: "HP" }
  ];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Nos Partenaires
          </div>
          <h2 className="heading-2 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-body">
            Nous travaillons avec les plus grandes marques technologiques pour vous offrir les meilleures solutions
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white p-8 rounded-xl flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-primary group-hover:to-primary-dark transition-all">
                  <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                    {partner.logo}
                  </span>
                </div>
                <div className="font-semibold text-text group-hover:text-primary transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary">
            Et bien d'autres partenaires technologiques de premier plan
          </p>
        </div>
      </div>
    </section>
  );
}
