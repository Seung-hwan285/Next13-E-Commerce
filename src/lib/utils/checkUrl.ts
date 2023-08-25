export const checkUrl = (str) => {
  const protocal = str.split(':')[0];

  if (protocal !== 'https') {
    return false;
  }

  const temp = str.split(':')[1].slice(0, 2);
  const subdomain = str.split(temp)[1];

  const hostname = subdomain.split('.');

  if (hostname.length !== 3) {
    return false;
  }

  return str;
};
