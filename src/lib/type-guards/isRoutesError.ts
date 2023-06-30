type routeType = {
  status: string;
  message: Error;
};

const isObjectError = (object: unknown): object is Record<string, unknown> => {
  return (
    typeof object === 'object' && object !== null && !Array.isArray(object)
  );
};

export const isRoutesError = (err: unknown): err is routeType => {
  if (!isObjectError(err)) return false;
  if (err instanceof Error) return true;

  return findError(err);
};

export const findError = <T extends object>(err: T) => {
  if (Object.prototype.toString.call(err) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(err) as T | null;

  return prototype === null ? false : findError(prototype);
};
