export const isNil = (v: unknown): boolean => v === undefined || v === null;

export const isNotNil = (v: unknown): boolean => !isNil(v);
