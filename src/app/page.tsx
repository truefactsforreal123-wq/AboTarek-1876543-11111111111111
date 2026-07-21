import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/data";
import { HomePageContent } from "./home-content";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { available: true },
        orderBy: { id: "asc" },
        take: 2,
      },
    },
  });

  const featuredItems = categories.flatMap((c) => c.items).slice(0, 4);

  return (
    <HomePageContent
      siteConfig={JSON.parse(JSON.stringify(siteConfig))}
      featuredItems={JSON.parse(JSON.stringify(featuredItems))}
    />
  );
}
