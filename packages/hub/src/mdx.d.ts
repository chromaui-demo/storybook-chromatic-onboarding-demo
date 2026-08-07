declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MdxDocument: ComponentType;
  export default MdxDocument;
}
