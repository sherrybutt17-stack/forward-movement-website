"use client";

import { useEffect, useState, type ReactNode } from "react";
import * as m from "motion/react-m";
import { duration, ease } from "@/components/motion/tokens";

// True after the first page has mounted, so the fade only runs on client-side navigation —
// never on the initial load, where it would delay Largest Contentful Paint.
let hasMounted = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <m.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.page, ease: ease.out }}
    >
      {children}
    </m.div>
  );
}
