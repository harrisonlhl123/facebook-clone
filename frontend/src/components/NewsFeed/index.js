import AllPosts from "../Posts/AllPosts"
import MakePosts from "../Posts/MakePosts"
import "./NewsFeed.css"
import logo from "../images/logo.png"




function NewsFeed() {

    return (
        <>
            <img src={logo} id="logo" alt="instabook logo"></img>
            <div id="main-feed">
                <div id="socials">
                    <p>My socials will be here</p>
                </div>
                <div id="posts-and-posting">
                    <MakePosts />
                    <AllPosts />
                </div>
                <div id="friends">
                    <p>Friends list will be here</p>
                </div>
            </div>
        </>
    )

}

export default NewsFeed
