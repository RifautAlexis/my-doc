import { Type } from '@angular/core';
import {
  ButtonOverviewExample,
  ButtonTypesExample,
  CardFancyExample,
  CardMediaSizeExample,
} from 'src/app/components-examples';

export const COMPONENT_MAP: Record<
  string,
  { componentType: Type<any>; fileName: string }
> = {
  ButtonOverviewExample: { componentType: ButtonOverviewExample, fileName: 'button-overview-example.ts' },
  ButtonTypesExample: { componentType: ButtonTypesExample, fileName: 'button-types-example.ts' },
  CardFancyExample: { componentType: CardFancyExample, fileName: 'card-fancy-example.ts' },
  CardMediaSizeExample: { componentType: CardMediaSizeExample, fileName: 'card-media-size-example.ts' },
};
