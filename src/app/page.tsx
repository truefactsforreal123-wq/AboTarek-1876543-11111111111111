import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/data";
import { HomePageContent } from "./home-content";

export default async function HomePage() {
  const [categories, branches] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        items: {
          where: { available: true },
          orderBy: { id: "asc" },
          take: 2,
        },
      },
    }),
    prisma.branch.findMany({ orderBy: { id: "asc" } }),
  ]);

  const featuredItems = categories.flatMap((c) => c.items).slice(0, 4);

  return (
    <HomePageContent
      siteConfig={JSON.parse(JSON.stringify(siteConfig))}
      featuredItems={JSON.parse(JSON.stringify(featuredItems))}
      branchCount={branches.length}
    />
  );
}
