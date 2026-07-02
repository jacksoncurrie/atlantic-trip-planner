import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages
    ? "https://jacksoncurrie.github.io"
    : "https://atlantic-trip-planner.local",
  base: isGitHubPages ? "/atlantic-trip-planner" : "/"
});
