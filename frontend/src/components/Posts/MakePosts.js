import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/posts';
import "./Posts.css"


function MakePosts() {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);

    const [body, setBody] = useState("");

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e) {
        // const authorId = user.id;
        dispatch(createPost({body}));
    }

    return(
        <div id="make-post">
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