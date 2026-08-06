import type { Preview } from '@storybook/angular-vite';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import { viewportOptions } from '../../../config/responsive';
import docJson from '../documentation.json';

setCompodocJson(docJson);

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
