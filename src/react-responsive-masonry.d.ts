declare module 'react-responsive-masonry' {
  import { ReactNode } from 'react';

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [key: number]: number };
    children?: ReactNode;
  }

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children?: ReactNode;
  }

  export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> {}
  export default class Masonry extends React.Component<MasonryProps> {}
}
