import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, createPost, updatePost } from '../../store/posts';
import "./Posts.css"


function MakePosts() {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const post = useSelector(getPost(postId));
    const [body, setBody] = useState(postId ? post.body: "");

    useEffect(() => {
        if(postId){
            dispatch(fetchPost(postId));
        }
    }, [postId])

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e){

        dispatch(postId ? updatePost({body, id: postId}) : createPost({body}));
    }

    return(
        <>
            <h1>{postId ? "Update Post" : "Create Post"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Body
                    <textarea onChange={changeBody}>{body}</textarea>
                </label>

                <input type="submit" value={postId ? "Update Post" : "Create Post"} />
            </form>
        </>
    )
}

export default MakePosts;