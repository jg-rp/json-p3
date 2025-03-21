/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["intro", "quick-start"],
    },
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: [
        "guides/jsonpath-syntax",
        "guides/jsonpath-extra",
        "guides/jsonpath-functions",
        "guides/json-pointer",
        "guides/json-patch",
      ],
    },
  ],
  API: [
    {
      type: "category",
      label: "Typedoc API",
      link: {
        type: "doc",
        id: "api/index",
      },
      items: require("./docs/api/typedoc-sidebar.cjs"),
    },
  ],
};

module.exports = sidebars;
