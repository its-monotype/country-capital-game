import { config } from 'reshaped/config/postcss.js';

export default {
  plugins: {
    ...config.plugins,
    tailwindcss: {},
    autoprefixer: {},
  },
};
