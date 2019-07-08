const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost:8000';
const request = require('supertest')(url);

describe('Employee', () => {
  let _bankId = '';
  beforeEach(async () => {
    const res = await request
      .post('/graphql')
      .send({
        query:
          'mutation { createBank(bank: { name: "Bank A", branchName: "Branch A" }) { _id } }',
      })
      .expect(200);
    if (res.body.data.createBank && res.body.data.createBank._id)
      _bankId = res.body.data.createBank._id;
  });

  it('should list employees', done => {
    request
      .post('/graphql')
      .send({
        query:
          '{ employees { _id name number accountHolder accountType accountNumber bank { name branchName } } }',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('employees');
        done();
      });
  });

  it('should create a new employee', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { createEmployee(employee: { name: "Employee X", number: 123456789, accountHolder: "Elliot Alderson", accountNumber: 9000017, bank: "${_bankId}"}) { name number accountHolder accountNumber accountType bank { name branchName } } }`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('createEmployee');
        expect(res.body.data.createEmployee).to.have.all.keys(
          'name',
          'number',
          'accountHolder',
          'accountNumber',
          'accountType',
          'bank',
        );
        expect(res.body.data.createEmployee).to.deep.equal({
          name: 'Employee X',
          number: 123456789,
          accountHolder: 'Elliot Alderson',
          accountNumber: 9000017,
          accountType: 'Checking',
          bank: {
            name: 'Bank A',
            branchName: 'Branch A',
          },
        });
        done();
      });
  });
});

describe('Employee', () => {
  let _bankId = '',
    _employeeId = '';
  beforeEach(async () => {
    const res = await request
      .post('/graphql')
      .send({
        query:
          'mutation { createBank(bank: { name: "Bank A", branchName: "Branch A" }) { _id } }',
      })
      .expect(200);

    if (res.body.data.createBank && res.body.data.createBank._id) {
      _bankId = res.body.data.createBank._id;

      const employeeRes = await request
        .post('/graphql')
        .send({
          query: `mutation { createEmployee(employee: { name: "Employee X", number: 123456789, accountHolder: "Elliot Alderson", accountNumber: 9000017, bank: "${_bankId}"}) { _id } }`,
        })
        .expect(200);

      if (
        employeeRes.body.data.createEmployee &&
        employeeRes.body.data.createEmployee._id
      )
        _employeeId = employeeRes.body.data.createEmployee._id;
    }
  });

  it('should update a new bank', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { updateEmployee(_id: "${_employeeId}", employee: { name: "Employee ABC", number: 987654321 }) { name number } }`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('updateEmployee');
        expect(res.body.data.updateEmployee).to.have.all.keys('name', 'number');
        expect(res.body.data.updateEmployee).to.deep.equal({
          name: 'Employee ABC',
          number: 987654321,
        });
        done();
      });
  });

  it('should delete a new bank', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { deleteEmployee(_id: "${_employeeId}") { name number } }`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('deleteEmployee');
        expect(res.body.data.deleteEmployee).to.have.all.keys('name', 'number');
        done();
      });
  });
});
