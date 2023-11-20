import { apiParser } from './api-parser';

export function apiDocGenerator(path: string) {
  apiParser(path);
}
