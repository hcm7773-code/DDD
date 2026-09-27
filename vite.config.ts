import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

// Plugin to auto-generate 404.html for GitHub Pages fallback
function githubPagesPlugin() {
  return {
    name: 'github-pages-plugin',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const fallbackPath = path.join(distDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [githubPagesPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          experience: path.resolve(__dirname, 'experience.html'),
          portfolio: path.resolve(__dirname, 'portfolio.html'),
          gaec: path.resolve(__dirname, 'gaec.html'),
          vels: path.resolve(__dirname, 'vels.html'),
          agents: path.resolve(__dirname, 'agents.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
