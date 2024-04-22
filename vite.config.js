import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Set the base path for assets
  assetsInclude: ["assets/**", "css/**", "js/**"], // Include assets from the 'assets' folder
});
