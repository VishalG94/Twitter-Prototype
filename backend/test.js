var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Positive Test Should check credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/login/login')
    .send({ password: '12345', email: 'samkitraseshbhai.sheth@sjsu.edu' })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Negative Test Should should check for invalid login", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/login/login')
    .send({ password: '1345', email: 'samkitraseshbhai.sheth@sjsu.edu' })
    .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
    });
})

it("Negative Signup Test", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/signup')
    .send({ username: 'Samkitvakjndvjkavvajk',
    password: '12345',
    email: 'samkitraseshbhai.sheth@sjsu.edu',
    resname: '',
    reszip: 0,
    type: 'user' })
    .end(function (err, res) {
        
        expect(res).to.have.status(404);
        done();
    });
})

it("Sign Up User Test", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/signup/signup')
    .send({ username: 'Samkit',
    password: '12345',
    email: 'sdasadsq@gmail.com',
    type: 'user' })
    .end(function (err, res) {
        
        expect(res).to.have.status(200);
        done();
    });
})

it("Sign Up Owner Test", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/signup/signup')
    .send({ username: 'test',
    password: '12345',
    email: 'samkit1asddsvcx21@gmail.com',
    resname: 'Dingy',
    reszip: '95126',
    type: 'owner' })
    .end(function (err, res) {        
        expect(res).to.have.status(200);
        done();
    });
})




