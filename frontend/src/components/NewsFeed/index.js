import AllPosts from "../Posts/AllPosts"
import MakePosts from "../Posts/MakePosts"
import "./NewsFeed.css"



function NewsFeed() {

    return (
        <div>
            <h1>Hello from newsfeed!</h1>
            <MakePosts />
            <AllPosts />
        </div>
    )

}

export default NewsFeed
