// .eslintrc.js
export default {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: "module", // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Allows parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
  extends: [
    "eslint:recommended", // Base ESLint recommended rules
    "plugin:react/recommended", // React-specific rules
    "plugin:@typescript-eslint/recommended", // TypeScript-specific rules
    "plugin:prettier/recommended", // Enables Prettier integration
  ],
  plugins: [
    "react", // React plugin for React-specific linting rules
    "react-hooks", // React Hooks plugin for Hooks-specific rules
    "@typescript-eslint", // TypeScript plugin for TypeScript-specific rules
    "prettier", // Prettier plugin for code formatting
  ],
  rules: {
    "prettier/prettier": "warn", // Integrate Prettier rules as ESLint warnings
    "react/react-in-jsx-scope": "off", // No need to import React in scope for Next.js or modern setups
    "react/prop-types": "off", // Turn off prop-types as we're using TypeScript
    "@typescript-eslint/explicit-module-boundary-types": "off", // Optional explicit return types
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warns on unused variables (ignores underscore-prefixed)
    "react-hooks/rules-of-hooks": "error", // Ensures that Hooks are called correctly
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  env: {
    browser: true, // Enables browser global variables like window and document
    es2021: true, // Enables ECMAScript 2021 global variables
    node: true, // Enables Node.js global variables
  },
  ignorePatterns: ["dist/", "node_modules/"], // Ignore build and dependency folders
};
