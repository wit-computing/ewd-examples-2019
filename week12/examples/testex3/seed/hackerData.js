import userModel from '../api/users/userModel';
import postModel from '../api/posts/postsModel';

const posts = [
    {id: 1,
      title: 'India - Tiger population sees 30% increase.',
      link: 'http://www.bbc.com/news/world-asia-30896028',
      user: '',
       comments: [],
       upvotes: 10,
     },
    {
       id: 2,
       title: 'The button that is not.',
       link: 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
       user: '',
       comments: [],
       upvotes: 12,
     },
     {
       id: 3,
       title: 'Google Nears $1B Investment in SpaceX',
       link: null,
       user: '',
       comments: [],
       upvotes: 12,
     },
     {
       id: 4,
       title: 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
       link: 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
       user: '',
       comments: [],
       upvotes: 2,
     },
 ];

const users = [{
        'username': 'user1',
        'password': 'test1',
    },
    {
        'username': 'user2',
        'password': 'test2',
    },
];


export default async function loadHackerData() {

    try {
        await userModel.deleteMany();
        //Save user data to db
        const user1 = await new userModel(users[0]).save();
        const user2 = await new userModel(users[1]).save();

        //assign users randomly to each post
        posts.forEach((post)=>{post.user = ((Math.random<0.5)?user1._id : user2._id)});


        //Load posts data
        await postModel.deleteMany();
        await postModel.collection.insertMany(posts);
        console.info(`${posts.length} posts were successfully stored.`);
        
        console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
    }
}