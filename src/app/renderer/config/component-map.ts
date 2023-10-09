import { Type } from '@angular/core';
import {
  ButtonOverviewExample,
  ButtonTypesExample,
  CardFancyExample,
  CardMediaSizeExample,
} from 'src/app/components-examples';

export const COMPONENT_MAP: Record<
  string,
  { componentType: Type<any>; fileName: string, filePath: string }
> = {
  ButtonOverviewExample: {
    componentType: ButtonOverviewExample,
    fileName: 'button-overview-example.ts',
    filePath: 'button/button-overview/',
  },
  ButtonTypesExample: {
    componentType: ButtonTypesExample,
    fileName: 'button-types-example.ts',
    filePath: 'button/button-types/',
  },
  CardFancyExample: {
    componentType: CardFancyExample,
    fileName: 'card-fancy-example.ts',
    filePath: 'card/card-fancy/',
  },
  CardMediaSizeExample: {
    componentType: CardMediaSizeExample,
    fileName: 'card-media-size-example.ts',
    filePath: 'card/card-media-size/',
  },
};
