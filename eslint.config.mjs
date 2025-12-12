import js from "@eslint/js"
import tseslint from "typescript-eslint"
import nextPlugin from "@next/eslint-plugin-next"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

const config = tseslint.config(
    { ignores: [".next/*"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react-hooks/set-state-in-effect": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                },
            ],
        },
    }
)

export default config
