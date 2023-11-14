import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, updatePost } from '../../store/posts';

const EditPosts = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const post = useSelector(getPost(postId));
    const [body, setBody] = useState("");

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, [postId])

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e){
        dispatch(updatePost({body, id: postId}));
    }

    return(
        <>
            <h1>{"Update Post"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Body
                    <textarea onChange={changeBody}>{body}</textarea>
                </label>

                <input type="submit" value={"Update Post"} />
            </form>
        </>
    )
}

export default EditPosts;