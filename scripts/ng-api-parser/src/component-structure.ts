export interface ComponentStructure {
  imports?: string[];
  classDecorators?: Array<ComponentDecorator | InjectableDecorator>;
  className: string;
  isExported: boolean;
  implements?: string[];
  extends?: string[];
  inputDecorators?: InputDecorator;
  outputDecorators?: OutputDecorator;
}

export enum DecoratorType {
  Injectable = 0,
  Component = 1,
  Input = 2,
  Output = 3,
}

export interface Decorator {
  kind: DecoratorType;
}

export interface ComponentDecorator extends Decorator {
  readonly kind: DecoratorType.Component,
  selector?: string;
  standalone?: boolean;
  templateUrl?: string;
  styleUrls?: string[];
  imports?: string[];
}

export interface InjectableDecorator extends Decorator {
  readonly kind: DecoratorType.Injectable,
  providedIn?: string;
}

export interface InputDecorator extends Decorator {
  readonly kind: DecoratorType.Input,
  name: string;
  isrequired?: boolean;
  isOptional: boolean;
  type: string;
  defaultValue?: defaultValue;
  visibility: Visibility;
}

export interface OutputDecorator extends Decorator {
  readonly kind: DecoratorType.Output,
  name: string;
  type: string;
  isOptional: boolean;
  defaultValue?: defaultValue;
  visibility: Visibility;
}

export enum Visibility {
  Public,
  Private,
  Protected,
}

export type defaultValue = string | number | boolean | Object | Array<string | number | boolean | Object>;