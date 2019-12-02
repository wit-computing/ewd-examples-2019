import React, {
    Component
} from 'react';
import NewsList from './components/newsList';
import Form from './components/newsForm';
import * as api from './api';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

export default class App extends Component {

    state = {posts: [{}],login:false};
    _isMounted = false;

    async componentDidMount () {
        this._isMounted=true
        try{
              const resp = await api.getAll();
              if (this._isMounted){
              this.setState({
                       posts: resp,
                       login: false,
                     });
                    }
     
           } catch (e){
             if (this._isMounted) this.setState({
                      login: true
                    });
           }
      };

      componentWillUnmount(){
        this._isMounted = false;
      }
     

    addNewsItem = async (title, link) => {
        try{
          const resp = await api.add(title, link);
          const newPost = {"id":resp.id,"title":title,"link":link,"upvotes":0, "comments":[]};
          this.setState({posts: this.state.posts.concat([newPost])});
        } catch(e){
          alert(`failed to add post: ${e}`);
        }
      };

      incrementUpvote = (id) => {
        api.upvote(id).then(resp=> {
               var upvotedPost = _.find(this.state.posts, post=>post.id === id);
               upvotedPost.upvotes++;  
               this.setState({})
             }) ;
      };

    render() {
        const posts = _.sortBy(this.state.posts, post =>
            post.upvotes);
        const { login } = this.state;
        return (
            <div className="container">
                
                <div className="row">
                    <div className="col-md-9 col-md-offset-1">
                        <NewsList posts={posts} upvoteHandler={this.incrementUpvote} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9 col-md-offset-1">
                        <Form handleAdd={ this.addNewsItem } />
                    </div>
                </div>
                {login && (<Redirect to='/login'/>)}
            </div>
           
        );
    }
}