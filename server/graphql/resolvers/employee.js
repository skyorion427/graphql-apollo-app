const { UserInputError } = require('apollo-server-express');
const _ = require('lodash');
const Employee = require('../../models/employee');
const Bank = require('../../models/bank');
const { isValidString, checkConditions } = require('../validators');
const { convertArray2Filter } = require('../utils/converter');

module.exports = {
  Query: {
    employees: async (
      parent,
      { filters, limit, offset, order, sort },
      context,
      info,
    ) => {
      checkConditions(filters, err => {
        if (err) throw new UserInputError(err);
      });

      let empQuery = Employee.find(convertArray2Filter(filters));
      if (order && sort) empQuery.sort({ sort: order });
      if (limit && offset) empQuery.skip(offset).limit(limit);

      const employees = await empQuery.populate().exec();

      return employees.map(employee => ({
        _id: employee._id.toString(),
        name: employee.name,
        number: employee.number,
        accountHolder: employee.accountHolder,
        accountType: employee.accountType,
        accountNumber: employee.accountNumber,
        bank: employee.bank,
      }));
    },
  },

  Mutation: {
    createEmployee: async (parent, { employee }, context, info) => {
      if (
        !isValidString(employee.name) ||
        !isValidString(employee.accountHolder)
      )
        throw new UserInputError('Field is invalid');
      const newEmployee = await new Employee({
        name: employee.name,
        number: employee.number,
        accountHolder: employee.accountHolder,
        accountType: employee.accountType,
        accountNumber: employee.accountNumber,
        bank: employee.bank,
      });

      return new Promise((resolve, reject) => {
        newEmployee.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateEmployee: async (parent, { _id, employee }, context, info) => {
      if (
        !isValidString(employee.name) ||
        !isValidString(employee.accountHolder)
      )
        throw new UserInputError('Field is invalid');
      return new Promise((resolve, reject) => {
        Employee.findByIdAndUpdate(
          _id,
          { $set: { ...employee } },
          { new: true },
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteEmployee: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Employee.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
  Employee: {
    bank: async ({ bank }, args, context, info) => {
      return await Bank.findById(bank);
    },
  },
};
