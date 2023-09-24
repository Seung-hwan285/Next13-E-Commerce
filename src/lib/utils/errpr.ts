import isError from 'next/dist/lib/is-error';
import { isPlainObject } from 'next/dist/shared/lib/is-plain-object';

export function getProperError(err: unknown): Error {
  if (isError(err)) {
    return err;
  }

  if (typeof err === 'undefined') {
    return new Error(
      'An undefined error was thrown, ' +
        'see here for more info: https://nextjs.org/docs/messages/threw-undefined'
    );
  }

  if (err === null) {
    return new Error(
      'A null error was thrown, ' +
        'see here for more info: https://nextjs.org/docs/messages/threw-undefined'
    );
  }

  // return new Error(isPlainObject(err) ? JSON.stringify(err) : err + '');
}

// export {};
