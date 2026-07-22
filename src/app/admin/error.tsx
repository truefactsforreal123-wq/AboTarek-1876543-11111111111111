"use client";

import { useAdminT } from "@/lib/use-admin-t";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useAdminT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg p-4">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-black text-admin-text">{t.somethingWentWrong}</h2>
        <p className="mt-2 text-sm text-admin-text-muted">
          {t.unexpectedError}
        </p>
        <button
          onClick={reset}
          className="btn-primary mt-6"
        >
          {t.tryAgain}
        </button>
        <a
          href="/admin"
          className="mt-3 inline-block text-sm font-bold text-admin-text-muted hover:text-admin-text"
        >
          {t.backToDashboard}
        </a>
      </div>
    </div>
  );
}
