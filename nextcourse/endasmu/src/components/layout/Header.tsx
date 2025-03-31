"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isThrottled = useRef(false);
  const router = useRouter();
  useEffect(() => {
    const initialScroll = window.scrollY > 44;
    setIsScrolled(initialScroll);
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (isThrottled.current) return;

      isThrottled.current = true;
      setTimeout(() => {
        const currentScrollY = window.scrollY;
        const headerTopHeight = 44;

        if (currentScrollY < headerTopHeight) {
          setIsHidden(false);
          setIsScrolled(false);
        } else if (currentScrollY > lastScrollY.current) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        if (currentScrollY >= headerTopHeight) {
          setIsScrolled(true);
        }

        lastScrollY.current = currentScrollY;
        isThrottled.current = false;
      }, 100);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);
  const isActive = (path: string) => {
    // Check if the current path matches the link's path
    return router.asPath === path;
  };
  return (
    <nav
      className={`z-50 fixed top-0 text-white left-0 w-full p-4 px-5 lg:px-28 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-background/70 bg-opacity-90 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">
          <Link href="/">Endasmu</Link>
        </h1>

        <div>
          <ul className="flex space-x-7">
            <li>
              <Link
                href="/collection"
                className={`${
                  isActive("/collection")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className={`${
                  isActive("/marketplace")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Market Place
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className={`${
                  isActive("/community")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/connect-wallet"
                className={`${
                  isActive("/connect-wallet")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Connect Wallet
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
