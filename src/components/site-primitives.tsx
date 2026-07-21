"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) return;
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1500, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return <span ref={ref}>{reducedMotion ? value : display}{suffix}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "start";
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-start"}>
      <p className={`mb-4 text-sm font-extrabold ${tone === "light" ? "text-brand-600" : "text-gold-300"}`}>{eyebrow}</p>
      <h2 className={`section-title ${tone === "light" ? "text-ink-950" : "text-cream"}`}>{title}</h2>
      <span className={`mt-5 inline-flex items-center gap-2 text-brand-400 ${align === "center" ? "justify-center" : "justify-start"}`} aria-hidden="true">
        <span className="h-px w-10 bg-gold-500/45" />
        <Flame size={18} fill="currentColor" />
        <span className="h-px w-10 bg-gold-500/45" />
      </span>
    </Reveal>
  );
}

export function Preloader({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 100 : 2600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950 overflow-hidden"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow behind logo (no blur for performance) */}
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(122,23,28,0.3)_0%,transparent_60%)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1.1, 1] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Secondary gold glow (no blur) */}
          <motion.div
            className="absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,126,20,0.2)_0%,transparent_60%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.8, 0.5], scale: [0.6, 1.1, 1] }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
          />

          {/* Outer rotating ring - desktop only */}
          {!reducedMotion && (
            <motion.div
              className="absolute hidden h-72 w-72 rounded-full border-2 border-gold-500/15 sm:block sm:h-80 sm:w-80"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ opacity: { duration: 0.5 }, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
            >
              <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-400 shadow-gold-glow" />
            </motion.div>
          )}

          {/* Inner counter-rotating ring - desktop only */}
          {!reducedMotion && (
            <motion.div
              className="absolute hidden h-60 w-60 rounded-full border border-brand-500/20 sm:block sm:h-64 sm:w-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: -360 }}
              transition={{ opacity: { duration: 0.5, delay: 0.3 }, rotate: { duration: 14, repeat: Infinity, ease: "linear" } }}
            >
              <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-500" />
            </motion.div>
          )}

          <div className="relative text-center">
            {/* Logo */}
            <motion.div
              className="relative mx-auto h-36 w-36 sm:h-52 sm:w-52"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pulse glow - desktop only (no blur on mobile) */}
              {!reducedMotion && (
                <motion.div
                  className="absolute hidden inset-0 rounded-full bg-gold-500/40 blur-2xl sm:block"
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <Image
                src="/logo.png"
                alt=""
                width={208}
                height={208}
                priority
                className="relative h-full w-full rounded-full object-cover shadow-gold-glow"
              />
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 font-black tracking-[0.3em] text-gold-300 text-base uppercase"
            >
              {label}
            </motion.p>

            {/* Dot loader */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-brand-500"
                  animate={reducedMotion ? {} : { opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>

          {/* Bottom sweep line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-transparent via-brand-500 to-transparent"
            initial={{ width: "0%", left: "50%" }}
            animate={{ width: "100%", left: "0%" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Top sweep line */}
          <motion.div
            className="absolute top-0 right-0 h-[4px] bg-gradient-to-l from-transparent via-gold-500 to-transparent"
            initial={{ width: "0%", right: "50%" }}
            animate={{ width: "100%", right: "0%" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
