import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ),

  {
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "import": importPlugin,
    },

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: ["./tsconfig.json"],
      },
    },

    rules: {
      // 🔧 Reglas generales
      "no-unused-vars": "warn",
      "no-console": "warn",

      // ⚛️ Reglas específicas de React
      "react/prop-types": "off",

      // 🔁 Reglas de Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 🧠 TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-require-imports": "error",

      // 📦 Importaciones
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
];

export default eslintConfig;