/* eslint-disable */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // Configuration for the config file itself
  {
    files: ["eslint.config.mjs"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Ignore Next.js build output, node_modules, and UI components
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "components/ui/**/*", // Ignore UI components
    ],
  },
  // Main configuration
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.eslint.json",
      tsconfigRootDir: __dirname,
    },
    rules: {
      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // We use TypeScript instead
      "react/jsx-sort-props": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-curly-brace-presence": ["error", "never"],
      "react/self-closing-comp": "error",
      "react/no-array-index-key": "warn",

      // Import rules
      "import/prefer-default-export": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          // "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "sort-imports": ["error", { ignoreDeclarationSort: true }],

      // TypeScript rules
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/ban-ts-comment": "warn",

      // Naming conventions (from previous config)
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          suffix: ["Type"],
        },
        {
          selector: "variable",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "function",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
          filter: {
            regex: "^[A-Z]",
            match: false,
          },
        },
        {
          selector: "function",
          format: ["PascalCase"],
          leadingUnderscore: "forbid",
          filter: {
            regex: "^[A-Z]",
            match: true,
          },
        },
        {
          selector: "variable",
          types: ["function"],
          format: ["PascalCase"],
          modifiers: ["exported"],
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "should", "can", "did", "will"],
          filter: {
            regex: "^(is|has|should|can|did|will)[A-Z].*$",
            match: true,
          },
        },
      ],

      // General JavaScript rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "no-return-await": "error",
      "no-await-in-loop": "warn",
      "prefer-const": "error",
      "spaced-comment": ["error", "always"],
      eqeqeq: ["error", "always"],

      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",
    },
  }),
];

export default eslintConfig;
