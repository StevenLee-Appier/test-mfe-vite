import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        aixon: {
          external: `http://localhost:8888/remoteEntry.js`,
          format: "var",
          from: "webpack",
        }
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: pkg.dependencies['react-dom'],
        },
        // '@appier/auth0-react': {
        //   singleton: true,
        // },
      },
    }),
  ],
})
