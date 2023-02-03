const checkErrorMessage = (error) => {
  if (typeof error.errorMessage !== 'undefined') return true;
  return false;
};

module.exports = checkErrorMessage;
