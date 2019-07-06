const isRegExp = value => {
  let regEx = RegExp('^[a-zA-Z0-9_ ]*$');
  return regEx.test(value);
};

const isValidString = value =>
  value === undefined ||
  (isRegExp(value) && value.length <= 256 && value.trim().length !== 0);
module.exports = isValidString;
