const checkErrorMessage = (error) => {
  if (typeof error.message !== 'undefined') return true;
  return false;
};

module.exports = checkErrorMessage;
