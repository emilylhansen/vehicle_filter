import { pipe, O, A, R } from "./fp-ts-exports";

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type RequiredProperties<T extends object> = Pick<T, RequiredKeys<T>>;
export type OptionalProperties<T extends object> = Pick<T, OptionalKeys<T>>;

export type DefaultProperties<T extends object> = Required<
  OptionalProperties<T>
>;

export const isNil = (v: unknown): boolean => v === undefined || v === null;

export const isNotNil = (v: unknown): boolean => !isNil(v);
