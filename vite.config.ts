import { defineConfig } from "vite";
import { globSync } from "glob";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),

        ...Object.fromEntries(
          globSync("src/pages/**/*.html").map((file) => {
            const name = file.replace("src/pages/", "").replace(".html", "");

            return [name, fileURLToPath(new URL(`./${file}`, import.meta.url))];
          }),
        ),
      },

      output: {
        codeSplitting: true,
      },
    },
  },
});
