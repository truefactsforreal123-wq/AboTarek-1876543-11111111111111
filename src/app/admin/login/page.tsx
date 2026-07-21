"use client";

import { createClient } from "@/lib/supabase/client";
import { Flame, Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen" dir="rtl">
      {/* left — portrait side */}
      <div className="relative hidden w-1/2 overflow-hidden bg-ink-950 lg:block">
        <img
          src="/founder.jpg"
          alt="أبو طارك"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-md bg-paper p-1" />
            <div className="leading-tight text-paper">
              <div className="text-lg font-extrabold">كشري أبو طارك</div>
              <div className="text-xs font-bold tracking-[0.2em] text-saffron-400">EST. 1950</div>
            </div>
          </div>
          <div className="text-paper">
            <p className="max-w-sm text-lg leading-relaxed text-paper/80">
              «السر مش في المكوّنات. السر في النسبة، وفي الصبر.»
            </p>
            <p className="mt-4 text-sm font-bold tracking-widest text-saffron-400">
              — أبو طارك
            </p>
          </div>
        </div>
      </div>

      {/* right — form */}
      <div className="flex w-full items-center justify-center bg-paper-texture p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* mobile brand */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-md bg-paper p-1 shadow" />
            <div className="leading-tight">
              <div className="text-lg font-extrabold text-ink-900">كشري أبو طارك</div>
              <div className="text-xs font-bold tracking-[0.2em] text-tomato-600">لوحة الإدارة</div>
            </div>
          </div>

          <div className="mb-8 hidden text-xs font-bold uppercase tracking-[0.25em] text-tomato-600 lg:block">
            لوحة الإدارة
          </div>
          <h1 className="display text-3xl text-ink-900">أهلاً من جديد.</h1>
          <p className="mt-2 text-sm text-ink-700/60">سجّل دخولك للوصول إلى لوحة التحكم.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-tomato-50 px-4 py-3 text-sm font-bold text-tomato-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-700/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aboutarek.com"
                  className="w-full rounded-md border border-ink-900/15 bg-paper py-3 pr-11 pl-4 text-sm font-medium text-ink-900 outline-none transition-colors focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-500/20"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-700/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-ink-900/15 bg-paper py-3 pr-11 pl-4 text-sm font-medium text-ink-900 outline-none transition-colors focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-500/20"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-base disabled:opacity-60"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
              ) : (
                <>
                  دخول
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 inline-block text-xs font-bold text-cobalt-700 underline underline-offset-4"
          >
            ← العودة للموقع
          </a>
        </div>
      </div>
    </div>
  );
}
