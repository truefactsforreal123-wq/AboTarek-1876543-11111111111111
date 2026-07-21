import { siteConfig, branches } from "@/lib/data";

export function RestaurantStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.name.ar,
    alternateName: siteConfig.name.en,
    url: siteConfig.siteUrl,
    logo: siteConfig.images.logo,
    image: siteConfig.images.logo,
    description: "كشري أبو طارك — طبقات بسيطة، طعم مش بيتنسي. من قلب القاهرة منذ 1950.",
    servesCuisine: ["Egyptian", "Koshari"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: `${siteConfig.stats.rating}`,
      bestRating: "5",
      reviewCount: siteConfig.stats.reviewCount,
    },
    telephone: branches.map((b) => `+2${b.whatsapp}`),
    sameAs: [siteConfig.facebook, siteConfig.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
