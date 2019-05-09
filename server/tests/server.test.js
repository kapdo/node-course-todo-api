const expect = require('expect');
const request = require('supertest');
const {
    ObjectID
} = require('mongodb');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

const id1 = new ObjectID();
const id2 = new ObjectID();


const todos = [{
    _id: id1,
    text: 'First Test todo'
}, {
    _id: id2,
    text: 'Second Test todo'
}];


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
});


describe('POST /Todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo Text';

        request(app).post('/todos').send({
            text
        }).expect(200).expect((res) => {
            expect(res.body.text).toBe(text);
        }).end((err, res) => {
            if (err) return done(err);
            Todo.find({
                text
            }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not crete todo with invalid body data', (done) => {
        request(app).post('/todos').send({}).expect(400).expect((res) => {
            expect(res.body._message).toBe('Todo validation failed');
        }).end((err, res) => {
            if (err) return done(err);
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${id1.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 404 if todo not found', (done)=>{
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if for non-object ids', (done)=>{
        request(app)
        .get(`/todos/${123}`)
        .expect(404)
        .end(done);
    });
});