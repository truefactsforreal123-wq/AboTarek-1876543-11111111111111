import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/page-header";
import { ReviewForm } from "@/components/review-form";
import { ReviewsList } from "@/components/reviews-list";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const [reviews, branches] = await Promise.all([
    prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { branch: { select: { nameAr: true, nameEn: true } } },
    }),
    prisma.branch.findMany({
      orderBy: { id: "asc" },
      select: { id: true, nameAr: true, nameEn: true },
    }),
  ]);

  return (
    <main id="main-content">
      <PageHeader page="reviews" />
      <ReviewsList reviews={reviews} />
      <ReviewForm branches={branches} />
    </main>
  );
}
