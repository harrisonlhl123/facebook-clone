import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AllPosts from "../Posts/AllPosts"
import MakePosts from "../Posts/MakePosts"
import "./NewsFeed.css"
import { useSelector } from "react-redux/es/hooks/useSelector"


function NewsFeed() {
    const currentUser = useSelector(state => state.session.user)
    if (!currentUser) return <Redirect to="/login" />;
    return (
        <>
            <div id="main-feed">
                <div id="socials">
                    <div style={{ color: "gold", fontSize: "50px" }}>
                        <a href="https://github.com/harrisonlhl123" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                    <br></br>
                    <div style={{ color: "gold", fontSize: "50px" }}>
                        <a href="https://www.linkedin.com/in/harrison-l-2738bb103/" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
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
