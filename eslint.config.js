import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettier.configs.recommended,
);
