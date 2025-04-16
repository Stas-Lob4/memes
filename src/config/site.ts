export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Memes",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Table",
      href: "/table",
    },
    {
      label: "Cards",
      href: "/cards",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Table",
      href: "/table",
    },
    {
      label: "Cards",
      href: "/cards",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
