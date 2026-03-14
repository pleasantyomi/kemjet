"use client";

import Logo from "@/components/layout/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nav = [
    {
      name: "home",
      href: "/",
      isActive: pathname === "/",
    },
    {
      name: "products",
      href: "/",
      isActive: pathname === "/",
    },
    {
      name: "hugging face",
      href: "/",
      isActive: pathname === "/",
    },
    {
      name: "research",
      href: "/",
      isActive: pathname === "/",
    },
  ];

  return (
    <div className="relative flex items-center justify-between w-11/12 pt-5 mx-auto">
      <Logo />

      {/* Desktop Navigation */}
      <div className="hidden gap-8 lg:flex">
        {nav.map((item) => (
          <Link key={item.name} href={item.href}>
            <span
              className={
                item.isActive
                  ? "text-white uppercase text-[14px] font-inter "
                  : "underline"
              }
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Right Links */}
      <div className="items-center hidden gap-6 lg:flex">
        <Link href="/" className="text-white uppercase text-[14px] font-inter">
          about us
        </Link>
        <Link href="/" className="text-white uppercase text-[14px] font-inter">
          contact
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="text-white lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-black lg:hidden"
          >
            {/* Menu Header with Logo and Close Button */}
            <div className="flex items-center justify-between w-11/12 pt-5 mx-auto mb-12">
              <Logo />
              <button
                className="text-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center h-full space-y-8">
              {nav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className={
                      item.isActive
                        ? "text-white uppercase text-[20px] font-inter"
                        : "text-gray-300 uppercase text-[20px] font-inter hover:text-white"
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white uppercase text-[20px] font-inter"
              >
                about us
              </Link>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white uppercase text-[20px] font-inter"
              >
                contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
