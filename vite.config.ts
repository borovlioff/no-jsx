import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/render.ts'),
      name: 'NoJSX',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        return format === 'cjs' ? 'render.cjs' : 'render.js';
      },
    },
    rollupOptions: {
      external: [], // нет внешних зависимостей
      output: {
        exports: 'named',
      },
    },
  },
});