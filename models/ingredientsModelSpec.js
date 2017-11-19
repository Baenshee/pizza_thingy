//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Ingredient = require('./ingredientsModel');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();

const testIngredient = {
    name: 'test',
    weight: 5,
    price: 10
};

//Our parent block
describe('Ingredients', () => {
    before((done) => {
        Ingredient.remove((err) => {
            done();
        });
    });
    describe('Get all ingredient', () => {
        it('it should GET all the ingredients', (done) => {
            Ingredient.getAllIngredient((err, data) => {
                should.not.exist(err);
                data.should.be.a('array');
                data.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('Create a ingredient', () => {
        it('it should create a ingredient', (done) => {
            Ingredient.createIngredient(testIngredient, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.name.should.be.eql(testIngredient.name);
                data.weight.should.be.eql(testIngredient.weight);
                data.price.should.be.eql(testIngredient.price);
                testIngredient._id = data._id;
                done();
            });
        });
    });
    describe('Get a ingredient', () => {
        it('it should GET a test ingredient', (done) => {
            Ingredient.getIngredientById(testIngredient._id, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.name.should.be.eql(testIngredient.name);
                data.weight.should.be.eql(testIngredient.weight);
                data.price.should.be.eql(testIngredient.price);
                done();
            });
        });
    });
    describe('Update a ingredient', () => {
        it('it should update a ingredient', (done) => {
            testIngredient.name = "test2";
            Ingredient.updateIngredient(testIngredient, (err, data) => {
                should.not.exist(err);
                Ingredient.getIngredientById(testIngredient._id, (err, data) => {
                    should.not.exist(err);
                    data.should.be.a('object');
                    data.name.should.be.eql(testIngredient.name);
                    data.weight.should.be.eql(testIngredient.weight);
                    data.price.should.be.eql(testIngredient.price);
                    done();
                });
            });
        });
    });
    describe('Remove a ingredient', () => {
        it('it should remove a ingredient', (done) => {
            Ingredient.deleteIngredient(testIngredient, (err) => {
                should.not.exist(err);
                Ingredient.getAllIngredient((err, data) => {
                    should.not.exist(err);
                    data.should.be.a('array');
                    data.length.should.be.eql(0);
                    done();
                });
            });
        });
    });
});
