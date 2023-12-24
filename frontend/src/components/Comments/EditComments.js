import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, fetchComment, updateComment } from '../../store/comments';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getPost } from '../../store/posts';

const EditComments = ({commentId, setShowModal}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const comment = useSelector(getComment(commentId));
    const postId = comment.postId;
    const post = useSelector(getPost(postId));
    const feedId = post.feedId;
    const location = useLocation();
    const [body, setBody] = useState(comment.body);

    useEffect(() => {
        dispatch(fetchComment(commentId));
    }, [commentId])

    function changeBody(e) {
        setBody(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        dispatch(updateComment({body, id: commentId})).then(() => {setShowModal(false); 
            if (location.pathname === '/') {
                history.push('/');
            } else {
                history.push(`/users/${feedId}`);
            }
        });
    }

    return(
        <>
            <div className="update-post-container">
                <h1 className="update-post-title">Edit Comment</h1>
                <form onSubmit={handleSubmit} className="update-post-form">
                    <label className="update-post-label">
                        <textarea
                            onChange={changeBody}
                            value={body}
                            className="update-post-textarea"
                        />
                    </label>

                    <input
                        type="submit"
                        value="Update Comment"
                        className="update-post-submit-btn"
                    />
                </form>
            </div>
        </>

    )
}

export default EditComments;