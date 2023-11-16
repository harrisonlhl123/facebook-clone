import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, updatePost } from '../../store/posts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EditPosts = ({postId, setShowModal}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(getPost(postId));
    const [body, setBody] = useState(post.body);

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, [postId])

    function changeBody(e) {
        setBody(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        dispatch(updatePost({body, id: postId})).then(() => {setShowModal(false); history.push("/")});
    }

    return(
        <>
            <h1>{"Update Post"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Body
                    <textarea onChange={changeBody} value={body}></textarea>
                </label>

                <input type="submit" value={"Update Post"} />
            </form>
        </>
    )
}

export default EditPosts;