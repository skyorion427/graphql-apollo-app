const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Checking', 'Saving'],
    default: 'Checking',
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: 'bank',
  },
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
