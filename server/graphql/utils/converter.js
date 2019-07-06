const _ = require('lodash');

const convertArray2Filter = array => {
  let conditions = {};
  if (array)
    array.map(cond => {
      let element = {};
      let value = {};
      if (cond.operator === 'gte' || cond.operator === 'lte') {
        value[`$${cond.operator}`] = parseInt(cond.value);
        element[cond.field] = value;
      } else if (cond.operator === 'like') {
        element[cond.field] = RegExp(`${cond.value}`);
      } else element[cond.field] = cond.value;
      _.merge(conditions, element);
    });
  return conditions;
};

module.exports = { convertArray2Filter };
