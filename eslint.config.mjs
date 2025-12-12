import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const config = defineConfig(
    { ignores: ["next-env.d.ts", ".next/*"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react-hooks/set-state-in-effect": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true }
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used"
                }
            ],
            "no-warning-comments": [
                "warn",
                { terms: ["TODO"], location: "anywhere" }
            ]
        }
    }
);

export default config;
