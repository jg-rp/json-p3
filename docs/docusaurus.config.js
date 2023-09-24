// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JSON P3",
  tagline: "JSONPath, JSON Patch and JSON Pointer for JavaScript.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://jg-rp.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/json-p3/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "jg-rp", // Usually your GitHub org/user name.
  projectName: "json-p3", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  trailingSlash: false,

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/jg-rp/json-p3/tree/docs",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../src/index.ts"],
        tsconfig: "../tsconfig.json",
        readme: "docs/README_API.md",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "JSON P3",
        logo: {
          alt: "JSON P3",
          src: "img/p3_path_plain.svg",
          srcDark: "img/p3_dark_path_plain.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            to: "/api/",
            label: "API",
            position: "left",
          },
          {
            to: "/playground/",
            label: "Try It",
            position: "left",
          },
          {
            href: "https://github.com/jg-rp/json-p3",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Getting started",
            items: [
              {
                label: "Introduction",
                to: "/",
              },
              {
                label: "Install",
                to: "/#install",
              },
              {
                label: "Quick start",
                to: "/quick-start",
              },
            ],
          },
          {
            title: "Guides",
            items: [
              {
                label: "JSONPath query syntax",
                to: "/guides/jsonpath-syntax",
              },
              {
                label: "JSONPath functions",
                to: "/guides/jsonpath-functions",
              },
              {
                label: "JSON Pointer",
                to: "/guides/json-pointer",
              },
              {
                label: "JSON Patch",
                to: "/guides/json-patch",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/jg-rp/json-p3",
              },
              {
                label: "Change Log",
                href: "https://github.com/jg-rp/json-p3/blob/main/CHANGELOG.md",
              },
              {
                label: "NPM",
                href: "https://www.npmjs.com/package/json-p3",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} James Prior. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
