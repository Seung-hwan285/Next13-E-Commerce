type TokenProps = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
};
export const isJwt = (token: TokenProps | unknown) => {
  try {
    const { name, email, picture, sub, iat, exp, jti } = token;
    if (!name || !email || !picture || !sub || !iat || !exp || !jti) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
