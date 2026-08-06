import type { Preview } from '@storybook/react-vite';

import { viewportOptions } from '../../../config/responsive';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
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
