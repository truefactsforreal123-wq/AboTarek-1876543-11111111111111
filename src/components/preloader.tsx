"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { logo } from "@/lib/assets";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 100 : 1450);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0.75, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: [0.75, 1.04, 1], opacity: 1 }}
            transition={{ duration: 0.75, ease: "backOut" }}
            className="preloader-logo"
          >
            <Image src={logo} alt="" fill priority sizes="180px" />
          </motion.div>
          <p>من قلب القاهرة</p>
          <div className="preloader-line" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
