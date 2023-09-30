import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();

  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  // const queryString =
  //   pathname !== '/'
  //     ? `${paramsString.length ? '?' : ''}${paramsString}`
  //     : `${paramsString}`;

  return `${pathname}${queryString}`;
};
