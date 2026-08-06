import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Onboarding',
          ['Welcome', 'Start here', 'Core', 'Advanced', 'Reference'],
          'Demo guide',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
