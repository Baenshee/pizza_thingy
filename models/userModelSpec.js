//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const User = require('./userModel');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();

const testUser = {
    username: 'test',
    password: 'test'
};

//Our parent block
describe('Users', () => {
    before((done) => { //Before each test we empty the database
        User.remove((err) => {
            done();
        });
    });
    describe('Create a user', () => {
        it('it should create a user', (done) => {
            User.createUser(testUser, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.username.should.be.eql(testUser.username);
                data.password.should.be.eql(testUser.password);
                testUser._id = data._id;
                done();
            });
        });
    });
    describe('Get a user', () => {
        it('it should GET a test pizza', (done) => {
            User.connect(testUser.username, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.username.should.be.eql(testUser.username);
                data.password.should.be.eql(testUser.password);
                done();
            });
        });
    });
    describe('Update a user', () => {
        it('it should update a user', (done) => {
            testUser.username = "test2";
            testUser.password = "testpass";
            User.updateUser(testUser, (err, data) => {
                should.not.exist(err);
                User.connect("test2", (err, data) => {
                    should.not.exist(err);
                    data.should.be.a('object');
                    data.username.should.be.eql(testUser.username);
                    data.password.should.be.eql(testUser.password);
                    done();
                });
            });
        });
    });
});
