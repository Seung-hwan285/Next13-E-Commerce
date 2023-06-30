export const validateKorenOnEnglish = (value: string) => {
  const pattern = /^([a-zA-Z\s]+|[ㄱ-ㅎㅏ-ㅣ가-힣\s]+)$/;
  if (!pattern.test(value)) {
    return 'Please enter text in english or korean';
  } else {
    return true;
  }
};

export const validatePassword = (value: string) => {
  const pattern = /^\d+$/;
  if (value.length >= 6) {
    return 'Please password length 6 lower';
  }
  if (!pattern.test(value)) {
    return 'Please password number';
  }
};
