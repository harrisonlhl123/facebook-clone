import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        <>
            <h1>{"Create Post"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Body
                    <textarea onChange={changeBody} value={body} placeholder='type something'></textarea>
                </label>

                <input type="submit" value="Create Post" />
            </form>
        </>
    )
}

export default MakePosts;