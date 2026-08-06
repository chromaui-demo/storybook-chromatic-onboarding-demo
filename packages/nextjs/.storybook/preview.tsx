import type { Preview } from '@storybook/nextjs-vite';

import { viewportOptions } from '../../../config/responsive';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
    viewport: { options: viewportOptions },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
