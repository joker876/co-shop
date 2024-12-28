import { map, OperatorFunction } from 'rxjs';

export function getSuccessRes<T extends Record<string, any>>(): OperatorFunction<
  T & { success?: boolean },
  Extract<T, { success: true }> | null
> {
  return map((res: T & { success?: boolean }) => {
    if (res.success === undefined || res.success === false) {
      return null;
    }
    delete res.success;
    return res as Extract<T, { success: true }>;
  });
}
