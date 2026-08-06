import type { Preview } from '@storybook/react-native-web-vite';

import { viewportOptions } from '../../../config/responsive';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
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
