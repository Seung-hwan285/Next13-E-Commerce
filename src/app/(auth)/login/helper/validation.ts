export const validateKorenOnEnglish = (value) => {
  const pattern = /^([a-zA-Z\s]+|[ㄱ-ㅎㅏ-ㅣ가-힣\s]+)$/;
  if (!pattern.test(value)) {
    return 'Please enter text in english or korean';
  } else {
    return true;
  }
};

export const validatePassword = (value) => {
  const pattern = /^\d+$/;
  // Custom password validation logic
  if (value.length >= 6) {
    return 'Plesase password length 6 lower'; // Password is valid
  }
  if (!pattern.test(value)) {
    return 'Please password number';
  }
};
