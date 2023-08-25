export const setSessionStroage = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSessionStroage = (key) => {
  try {
    if (typeof window !== 'undefined') {
      const value = window.sessionStorage.getItem(key);
      return value === null ? null : JSON.parse(value);
    }
  } catch (err) {
    console.error(err);
  }
};
export const removeSessionStroage = (key) => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  } catch (err) {
    console.error(err);
  }
};
