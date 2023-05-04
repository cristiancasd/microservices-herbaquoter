import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()]
})*/

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3011, // you can replace this port with any port
  },
});

/*export default defineConfig({
  server: {
    port: 3011,
    host: true, // needed for the Docker Container port mapping to work
  },
  plugins: [react()],
})*/
