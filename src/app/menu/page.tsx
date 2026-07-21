import { prisma } from "@/lib/prisma";
import { MenuPageContent } from "./menu-content";

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { available: true },
        orderBy: { id: "asc" },
      },
    },
  });

  return <MenuPageContent categories={JSON.parse(JSON.stringify(categories))} />;
}
