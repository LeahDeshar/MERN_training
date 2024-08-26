"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./main-header.module.css";
export default function Navlink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={path.startsWith(href) ? classes.active : undefined}
    >
      {children}
    </Link>
  );
}
