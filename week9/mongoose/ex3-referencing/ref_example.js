import dotenv from 'dotenv';
import './db';
import Post from './postsModel';
import User from './userModel';

dotenv.config();

const refTest = async function () {
    try {
        //find user or create a user
        const user1 = await User.findByUserName("testUser") || await new User({
            username: "testUser",
            password: "pass1"
        }).save();
        
        //Create a post by the user
        const post1 = new Post({
            title: `Another post by ${user1.username}`,
            user: user1._id
        });
        //save post to db (could have done this as part of last statement as with user)
        await post1.save();

        //query db for post and populate user field
        const post = await Post.findById(post1._id).populate('user');

        console.log(JSON.stringify(post, null, "\t"));
    } catch (e) {
        console.error("failed to add create post", e);
    }
    //nothing more to see here - exit the process.
    process.exit();
};

//call the reference test function.
refTest();