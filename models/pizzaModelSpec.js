//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Pizza = require('./pizzaModel');
const Ingredient = require('./ingredientsModel');

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();

const testPizza={
    name: 'test',
    description: 'test discription',
    price: 10,
    ingredients: [],
    image: "test image",
};
const testIngredient={
    name: 'test',
    weight: 5,
    price: 10
};
let pizzaId;
let ingredientId;

//Our parent block
describe('Pizzas', () => {
    before((done) => { //Before each test we empty the database
        Pizza.remove((err) => {
            Ingredient.remove((err) => {
                Ingredient.createIngredient(testIngredient, (err, data) => {
                    ingredientId = data._id;
                    testPizza.ingredients.push(ingredientId);
                    done();
                });
            });
        });
    });
    describe('Get all pizza', () => {
        it('it should GET all the pizzas', (done) => {
            Pizza.getAllPizza((err, data) => {
                should.not.exist(err);
                data.should.be.a('array');
                data.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('Create a pizza', () => {
        it('it should create a pizza', (done) => {
            Pizza.createPizza(testPizza, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.name.should.be.eql(testPizza.name);
                data.description.should.be.eql(testPizza.description);
                data.price.should.be.eql(testPizza.price);
                data.ingredients.should.be.eql(testPizza.ingredients);
                data.image.should.be.eql(testPizza.image);
                pizzaId = data._id;
                testPizza._id=pizzaId;
                done();
            });
        });
    });
    describe('Get a pizza', () => {
        it('it should GET a test pizza', (done) => {
            Pizza.getPizzaById(pizzaId, (err, data) => {
                should.not.exist(err);
                data.should.be.a('object');
                data.name.should.be.eql(testPizza.name);
                data.description.should.be.eql(testPizza.description);
                data.price.should.be.eql(testPizza.price);
                data.ingredients[0]._id.should.be.eql(testPizza.ingredients[0]);
                data.image.should.be.eql(testPizza.image);
                done();
            });
        });
    });
    describe('Update a pizza', () => {
        it('it should update a pizza', (done) => {
            testPizza.name = "test2";
            Pizza.updatePizza(testPizza, (err, data) => {
                should.not.exist(err);
                Pizza.getPizzaById(pizzaId, (err, data) => {
                    should.not.exist(err);
                    data.should.be.a('object');
                    data.name.should.be.eql(testPizza.name);
                    data.description.should.be.eql(testPizza.description);
                    data.price.should.be.eql(testPizza.price);
                    data.ingredients[0]._id.should.be.eql(testPizza.ingredients[0]);
                    data.image.should.be.eql(testPizza.image);
                    done();
                });
            });
        });
    });
    describe('Remove a pizza', () => {
        it('it should remove a pizza', (done) => {
            Pizza.deletePizza(testPizza, (err) => {
                should.not.exist(err);
                Pizza.getAllPizza((err, data) => {
                    should.not.exist(err);
                    data.should.be.a('array');
                    data.length.should.be.eql(0);
                    done();
                });
            });
        });
    });
});
