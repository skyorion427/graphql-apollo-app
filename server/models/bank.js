const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
});

module.exports = Bank = mongoose.model('bank', BankSchema);
