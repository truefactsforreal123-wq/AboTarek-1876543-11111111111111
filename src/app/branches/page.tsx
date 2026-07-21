import { prisma } from "@/lib/prisma";
import { BranchesPageContent } from "./branches-content";

export default async function BranchesPage() {
  const branches = await prisma.branch.findMany({ orderBy: { id: "asc" } });

  return <BranchesPageContent branches={JSON.parse(JSON.stringify(branches))} />;
}
