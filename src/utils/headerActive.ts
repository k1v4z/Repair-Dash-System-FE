import routePath from "@/config/route";

export const isLinkActive = (href: string) => {
  if (href.startsWith("/#")) {
    return location.pathname === "/" && location.hash === href.substring(1);
  }

  if (href === "/") {
    return location.pathname === "/" && !location.hash;
  }

  if (href === routePath.searchService)
    return location.pathname.includes("/services/search");

  return location.pathname === href;
};
