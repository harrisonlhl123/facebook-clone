import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import { getUser } from '../../store/users';
import "./Posts.css"


function MakePosts() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser?.id
    const user = useSelector(getUser(userId))


    const [body, setBody] = useState("");

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const authorId = user.id;
        setBody("");
        dispatch(createPost({body}));
    }

    return(
        <div id="make-post">
            <div className="post-profile-pic">
                <img src={`${user?.pfp}`} />
            </div>
            <form onSubmit={handleSubmit} >
                <label>
                    <textarea onChange={changeBody} value={body} placeholder="What's on your mind?" id="text-area-post"></textarea>
                </label>

                <div id="create-post-button">
                    <input type="submit" value="Create Post" />
                </div>
            </form>
        </div>
    )
}

export default MakePosts;