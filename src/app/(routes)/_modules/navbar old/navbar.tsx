"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

import NavLeft from "./navbar/nav-left";
import NavMain from "./navbar/nav-main";
import NavRight from "./navbar/nav-right";
import NavLinks from "./navbar/components/nav-links";

export function useNavRoutes() {
  const pathName = usePathname();

  const categoryRoutes = categories.map((route) => ({
    href: `/collections/${route.id}`,
    label: route.title,
    active: pathName === `/collections/${route.id}`,
  }));

  return [
    ...categoryRoutes,
    {
      href: `/collections/new_arrivals`,
      label: "New Arrivals",
      active: pathName === `/collections/newarrivals`,
    },
    {
      href: `/collections/trending`,
      label: "Trending",
      active: pathName === `/collections/trending`,
    },
    {
      href: `/collections/sales`,
      label: "Sale",
      active: pathName === `/collections/sales`,
    },
];
}

export default function Navbar() {
  const routes = useNavRoutes();
  return (
    <div>
      <div className="flex items-center justify-between 
      container mx-auto py-2 p-4"
      >
        <NavLeft />
        <div className="hidden md:block">
          <NavMain />
        </div>
        <NavRight />
      </div>
      <div className="bg-secondary">
        <div className="hidden md:flex justify-between 
        container mx-auto py-2 px-4"
        >
          {routes.map((route, index) => (
            <NavLinks 
            key={index} 
            route={route} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}