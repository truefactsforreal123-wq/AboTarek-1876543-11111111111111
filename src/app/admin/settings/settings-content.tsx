"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Clock, Eye, Volume2, Check } from "lucide-react";

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        on ? "bg-cobalt-500" : "bg-ink-900/15"
      }`}
      aria-pressed={on}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 h-5 w-5 rounded-full bg-paper shadow ${
          on ? "right-1" : "right-6"
        }`}
      />
    </button>
  );
}

interface Props {
  initialSettings: Record<string, unknown>;
}

export function SettingsContent({ initialSettings }: Props) {
  const [ttl, setTtl] = useState(Number(initialSettings.order_ttl_hours) || 4);
  const [liveTracking, setLiveTracking] = useState(
    initialSettings.customer_live_tracking === true || initialSettings.customer_live_tracking === "true"
  );
  const [soundAlerts, setSoundAlerts] = useState(
    initialSettings.staff_sound_alerts !== false && initialSettings.staff_sound_alerts !== "false"
  );
  const [saved, setSaved] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to database via server action
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="max-w-3xl space-y-8" dir="rtl">
      {/* header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-tomato-600">
          الإعدادات
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-ink-900">إعدادات النظام</h1>
        <p className="mt-1 text-sm text-ink-700/60">
          تحكّم في سلوك الطلبات وتتبّعها.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        {/* TTL */}
        <div className="rounded-lg border border-ink-900/10 bg-paper p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-saffron-50 text-saffron-600">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-ink-900">مدة حفظ الطلبات</h2>
              <p className="mt-1 text-sm text-ink-700/60">
                الطلبات التي تم تقديمها تُحذف تلقائياً بعد هذه المدة.
              </p>
              <div className="mt-5 flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={72}
                  value={ttl}
                  onChange={(e) => setTtl(Number(e.target.value))}
                  className="flex-1 accent-tomato-600"
                />
                <div className="flex items-baseline gap-1.5 rounded-md bg-paper-warm px-3 py-1.5">
                  <span className="text-2xl font-extrabold tabular-nums text-ink-900">{ttl}</span>
                  <span className="text-xs font-bold text-ink-700/50">ساعة</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[0.65rem] text-ink-700/40">
                <span>١ ساعة</span>
                <span>٧٢ ساعة</span>
              </div>
            </div>
          </div>
        </div>

        {/* live tracking */}
        <div className="rounded-lg border border-ink-900/10 bg-paper p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cobalt-50 text-cobalt-600">
              <Eye className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-ink-900">تتبّع الطلب المباشر</h2>
              <p className="mt-1 text-sm text-ink-700/60">
                اسمح للعميل بمتابعة حالة طلبه (استُلم → تحضير → جاهز → اُكل).
              </p>
            </div>
            <Toggle on={liveTracking} onChange={setLiveTracking} />
          </div>
        </div>

        {/* sound alerts */}
        <div className="rounded-lg border border-ink-900/10 bg-paper p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-tomato-50 text-tomato-600">
              <Volume2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-ink-900">تنبيه صوتي للطلبات</h2>
              <p className="mt-1 text-sm text-ink-700/60">
                صوت تنبيه عند وصول طلب جديد في لوحة الطاولات.
              </p>
            </div>
            <Toggle on={soundAlerts} onChange={setSoundAlerts} />
          </div>
        </div>

        {/* save */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm font-bold text-cobalt-700"
            >
              <Check className="h-4 w-4" />
              تم الحفظ
            </motion.div>
          )}
          <button type="submit" className="btn-primary text-sm">
            <Save className="h-4 w-4" />
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
}
