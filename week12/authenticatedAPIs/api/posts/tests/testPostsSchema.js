import should from 'should';
import postsModel from '../postsModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('postModelTests', () => {

    let post = {};
    //create a post with random user id before each test
    beforeEach(() => {
        const id = mongoose.Types.ObjectId().toString(); //generates pseudo random ObjectID 
        post = {
            user: id,
            title: "A title"
        };
    })

    it('should validate a post with a user and title', (done) => {
        const m = new postsModel(post);
        m.validate((err) => {
            should.not.exist(err);
            m.title.should.equal(post.title);
            m.user.toString().should.equal(post.user);
            done();
        });
    });

    it('should require a user and title', (done) => {

        const badPost = {
            message: "This is not valid"
        };
        const m = new postsModel(badPost);
        m.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("user");
            errors.should.have.property("title");
            done();
        });
    });



    it('should add a comment to a post', function (done) {
        const m = new postsModel(post);
        m.comments.push({
            body: "a comment body",
            user: "5ca22a64816cd8423c27214c"
        });
        m.validate((err) => {
            should.not.exist(err);
            m.comments[0].body.should.equal("a comment body");
            m.comments[0].user.toString().should.equal("5ca22a64816cd8423c27214c");
            done();
        });
    });

    it('should require a user and body for a comment to a post', function (done) {
        const m = new postsModel(post);
        m.comments.push({
            acomment: "this is not a valid comment"
        });
        m.validate((err) => {
            should.exist(err);
            const errors = err.errors;
            errors.should.have.property("comments.0.user");
            errors.should.have.property("comments.0.body");
            done();
        });
    });

});