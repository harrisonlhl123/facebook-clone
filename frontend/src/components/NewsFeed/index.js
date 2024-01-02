import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AllPosts from "../Posts/AllPosts"
import MakePostsModal from "../Posts/MakePostsModal"
import "./NewsFeed.css"
import { useSelector } from "react-redux/es/hooks/useSelector"
import ContactsList from "../Friends/ContactsList"
import { getPosts } from "../../store/posts"

function NewsFeed() {
    let allPosts = useSelector(getPosts)
    
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
                    <MakePostsModal />
                    <AllPosts posts={allPosts}/>
                </div>
                <div id="friends">
                    <p>Contacts</p>
                    <ContactsList />
                </div>
            </div>
        </>
    )

}

export default NewsFeed
