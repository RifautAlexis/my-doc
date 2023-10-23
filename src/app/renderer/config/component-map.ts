import { Type } from '@angular/core';
import {
  ButtonOverviewExample,
  ButtonTypesExample,
  CardFancyExample,
  CardMediaSizeExample,
} from 'src/app/components-examples';

export const COMPONENT_MAP: Record<string, Type<any>> = {
  ButtonOverviewExample: ButtonOverviewExample,
  ButtonTypesExample: ButtonTypesExample,
  CardFancyExample: CardFancyExample,
  CardMediaSizeExample: CardMediaSizeExample,
};
