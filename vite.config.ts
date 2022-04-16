import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 6060,   // start port
    open: true  // is default open
  },
  build:{
    rollupOptions:{
      input:'src/index.html'  // input file when build the application
    }
  }
})
