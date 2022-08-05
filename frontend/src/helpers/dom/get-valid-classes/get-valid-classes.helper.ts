import { clsx, ClassValue } from 'clsx';

const getValidClasses = (...values: ClassValue[]): string => clsx(values);

export { getValidClasses };
