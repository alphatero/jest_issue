import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { minifyHtml, injectHtml } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      vue(),
      viteSingleFile(),
      minifyHtml(),
      injectHtml({
        injectData: {
          title: process.env.VITE_APP_TITLE,
        },
      }),
    ],
    resolve: { dedupe: ["vue"] },
    build: {
      target: "esnext",
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => "everything.js",
        },
      },
    },
  });
};
