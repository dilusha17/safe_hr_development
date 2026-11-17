import { defineConfig, type Plugin } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

/**
 * resources/js/lib/icons.ts imports three complete Iconify JSON sets (~18 MB) but registers
 * only the icons listed in `iconNames`. This plugin trims each set to those icons at build
 * time so the JS bundle stays small. Add an icon to `iconNames` and it is picked up automatically.
 */
function iconifySubset(): Plugin {
  const source = fs.readFileSync(path.resolve(__dirname, "resources/js/lib/icons.ts"), "utf8");
  const used = new Set([...source.matchAll(/"([a-z0-9-]+:[a-z0-9-]+)"/g)].map((m) => m[1] as string));
  return {
    name: "iconify-subset",
    enforce: "pre",
    transform(code, id) {
      const match = /@iconify-json\/([^/]+)\/icons\.json$/.exec(id.split("?")[0]!.replace(/\\/g, "/"));
      if (!match) return null;
      const set = JSON.parse(code) as { prefix: string; icons: Record<string, unknown> };
      const icons = Object.fromEntries(
        Object.entries(set.icons).filter(([name]) => used.has(`${set.prefix}:${name}`)),
      );
      return JSON.stringify({ ...set, icons, aliases: {} });
    },
  };
}

export default defineConfig({
  plugins: [
    iconifySubset(),
    laravel({
      input: ["resources/js/app.tsx"],
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
    },
  },
  server: {
    watch: {
      ignored: ["**/storage/framework/views/**"],
    },
  },
});
