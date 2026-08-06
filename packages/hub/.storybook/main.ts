import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const references = [
  {
    id: 'react',
    title: 'React',
    environmentName: 'STORYBOOK_REACT_URL',
    localUrl: 'http://localhost:6007',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    environmentName: 'STORYBOOK_NEXTJS_URL',
    localUrl: 'http://localhost:6008',
  },
  {
    id: 'angular',
    title: 'Angular',
    environmentName: 'STORYBOOK_ANGULAR_URL',
    localUrl: 'http://localhost:6009',
  },
  {
    id: 'web-components',
    title: 'Web Components',
    environmentName: 'STORYBOOK_WEB_COMPONENTS_URL',
    localUrl: 'http://localhost:6010',
  },
  {
    id: 'react-native-web',
    title: 'React Native Web',
    environmentName: 'STORYBOOK_REACT_NATIVE_WEB_URL',
    localUrl: 'http://localhost:6011',
  },
] as const;

const refs = Object.fromEntries(
  references.flatMap(({ id, title, environmentName, localUrl }) => {
    const url =
      process.env[environmentName] ??
      (process.env.CHROMATIC === 'true' ? undefined : localUrl);

    return url ? [[id, { title, url }]] : [];
  }),
);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../docs/onboarding/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  managerHead: (head) => `${head}
    <script>
      const params = new URLSearchParams(window.location.search);
      const refId = params.get('refId');

      if (refId || !window.location.search) {
        window.location.replace(
          window.location.pathname + '?path=/docs/onboarding-welcome--docs'
        );
      }
    </script>`,
  refs,
};

export default config;
