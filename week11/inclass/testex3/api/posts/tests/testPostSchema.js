import should from 'should';
import postsModel from '../postsModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('postModelTests', () => {

    it('should validate a post with a user and title', (done) => {
        const post={user: "5ca22a64816cd8423c27214d", title: "A title"};
        const m = new postsModel(post);
        m.validate((err) => {
           should.not.exist(err);
           m.title.should.equal("A title");
           m.user.toString().should.equal("5ca22a64816cd8423c27214d");
           done();
        });
    });
    
    it('should require a user and title', (done) => {

        const post={message: "This is not valid"};
        const m = new postsModel(post);
        
        m.validate((err) => {
           const errors = err.errors;
           errors.should.have.property("user");
           errors.should.have.property("title");
           done();
        });
    });

  

    it('should add a comment to a post', function(done) {
        const post={user: "5ca22a64816cd8423c27214d", title: "A title"};
        const m = new postsModel(post);
        m.comments.push({body:"a comment body",user:"5ca22a64816cd8423c27214c"});
        
        m.validate((err) => {
           should.not.exist(err);
           m.comments[0].body.should.equal("a comment body");
           m.comments[0].user.toString().should.equal("5ca22a64816cd8423c27214c");
           done();
        });
    });

    it('should require a user and body for a comment to a post', function(done) {
        const post={user: "5ca22a64816cd8423c27214d", title: "A title"};
        const m = new postsModel(post);
        m.comments.push({acomment:"this is not a valid comment"});
        
        m.validate((err) => {
           should.exist(err);
           const errors = err.errors;
           errors.should.have.property("comments.0.user");
           errors.should.have.property("comments.0.body");
           done();
        });
    });
});



