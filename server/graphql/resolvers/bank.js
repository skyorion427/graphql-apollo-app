const Bank = require('../../models/bank');
const { isValidString } = require('../validators');

module.exports = {
  Query: {
    banks: async () => {
      const banks = await Bank.find({})
        .populate()
        .exec();

      return banks.map(bank => ({
        _id: bank._id.toString(),
        name: bank.name,
        branchName: bank.branchName,
      }));
    },
  },
  Mutation: {
    createBank: async (parent, { bank }, context, info) => {
      if (!isValidString(bank.name) || !isValidString(bank.branchName))
        throw new UserInputError('Field is invalid');
      const newBank = await new Bank({
        name: bank.name,
        branchName: bank.branchName,
      });

      return new Promise((resolve, reject) => {
        newBank.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateBank: async (parent, { _id, bank }, context, info) => {
      if (!isValidString(bank.name) || !isValidString(bank.branchName))
        throw new UserInputError('Field is invalid');
      return new Promise((resolve, reject) => {
        Bank.findByIdAndUpdate(_id, { $set: { ...bank } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          },
        );
      });
    },
    deleteBank: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Bank.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
};
