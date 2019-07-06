const chai = require('chai');
const expect = chai.expect;
const { isValidString, checkConditions } = require('../graphql/validators');

describe('Validator', () => {
  it('should pass isValidString', done => {
    expect(isValidString('ABC 123')).to.equal(true);
    done();
  });

  it('should fail isValidString', done => {
    expect(isValidString('ABC***123')).to.equal(false);
    done();
  });

  it('should pass checkConditions', done => {
    checkConditions([{ operator: 'gte', value: '50' }], err => {
      expect(err).to.equal('');
      done();
    });
  });

  it('should fail checkConditions', done => {
    checkConditions([{ operator: 'gte', value: 'ABC' }], err => {
      expect(err).to.equal('Value must be a number.');
      done();
    });
  });
});
