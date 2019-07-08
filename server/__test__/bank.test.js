const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost:8000';
const request = require('supertest')(url);

describe('Bank', () => {
  it('should list banks', done => {
    request
      .post('/graphql')
      .send({ query: '{ banks { name branchName } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('banks');
        done();
      });
  });

  it('should create a new bank', done => {
    request
      .post('/graphql')
      .send({
        query:
          'mutation { createBank(bank: { name: "Bank C", branchName: "Branch C" }) { name branchName } }',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('createBank');
        expect(res.body.data.createBank).to.have.all.keys('name', 'branchName');
        expect(res.body.data.createBank).to.deep.equal({
          name: 'Bank C',
          branchName: 'Branch C',
        });
        done();
      });
  });
});
describe('Bank', () => {
  let _id = '';
  beforeEach(async () => {
    const res = await request
      .post('/graphql')
      .send({
        query:
          'mutation { createBank(bank: { name: "Bank A", branchName: "Branch A" }) { _id } }',
      })
      .expect(200);
    if (res.body.data.createBank && res.body.data.createBank._id)
      _id = res.body.data.createBank._id;
  });

  it('should update a new bank', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { updateBank(_id: "${_id}", bank: { name: "Bank C", branchName: "Branch C" }) { name branchName } }`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('updateBank');
        expect(res.body.data.updateBank).to.have.all.keys('name', 'branchName');
        expect(res.body.data.updateBank).to.deep.equal({
          name: 'Bank C',
          branchName: 'Branch C',
        });
        done();
      });
  });

  it('should delete a new bank', done => {
    request
      .post('/graphql')
      .send({
        query: `mutation { deleteBank(_id: "${_id}") { name branchName } }`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('deleteBank');
        expect(res.body.data.deleteBank).to.have.all.keys('name', 'branchName');
        done();
      });
  });
});
