const isRegularString = value => {
  let regEx = RegExp('^[a-zA-Z0-9_ ]*$');
  return regEx.test(value);
};

const isValidString = value =>
  value === undefined ||
  (isRegularString(value) && value.length <= 256 && value.trim().length !== 0);

const checkConditions = (value, errorFunc) => {
  let err = '';
  if (value === undefined) return errorFunc(err);
  value.map(cond => {
    if (
      (cond.operator === 'gte' || cond.operator === 'lte') &&
      !parseInt(cond.value)
    ) {
      err += 'Value must be a number.';
    }
  });

  return errorFunc(err);
};

module.exports = { isValidString, checkConditions };
