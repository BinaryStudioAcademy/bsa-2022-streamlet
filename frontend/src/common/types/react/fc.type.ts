import { FC as OriginFC, ReactNode } from 'react';

type FC<P = Record<string, unknown>> = OriginFC<
  P & {
    children?: ReactNode;
  }
>;

export { type FC };
