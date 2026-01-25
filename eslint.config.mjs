/* 
  eslint.config.mjs 
  Organized by: raiyayusuf
*/

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  /* ============================================
     NEXT.JS CORE RULES
     ============================================ */
  ...nextVitals,
  ...nextTs,

  /* ============================================
     CUSTOM RULES - NAMING CONVENTION
     ============================================ */
  {
    rules: {
      // Enforce camelCase for variables and functions
      camelcase: ["error", { properties: "always" }],

      // Enforce PascalCase for React components
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],

      // Additional useful rules
      "no-unused-vars": "warn",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },

  /* ============================================
     IGNORED FOLDERS
     ============================================ */
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
