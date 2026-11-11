import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/data/links";

// `new Date()` can't run while prerendering, so the year is cached instead.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <div className="grid gap-8 bg-[#171717] px-6 py-10 text-center text-white sm:grid-cols-2 sm:text-left lg:grid-cols-[1fr_1fr_auto] lg:items-start lg:gap-12 lg:px-10">
      <div className="space-y-4">
        <Link
          className="flex items-center justify-center gap-3 sm:justify-start"
          href="/"
        >
          <Image
            src="/assets/logo.svg"
            alt=""
            width={36}
            height={36}
            className="size-8 brightness-0 invert"
          />
          <span className="text-base font-semibold tracking-[0.12em]">
            GARMENT STORE
          </span>
        </Link>

        <div className="space-y-1 text-xs text-white/60">
          <p>
            &copy; <CurrentYear /> Garment Store.
          </p>
          <p>All rights reserved.</p>
        </div>
      </div>

      {footerLinks.map((section) => (
        <div key={section.title}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href} className="text-sm">
                <Link
                  href={link.href}
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
