import { defineConfig } from "vite";
import pluginChecker from "vite-plugin-checker";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [pluginChecker({ typescript: true })],
});
