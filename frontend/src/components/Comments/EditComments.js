import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, fetchComment, updateComment } from '../../store/comments';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EditComments = ({commentId, setShowModal}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const comment = useSelector(getComment(commentId));
    const [body, setBody] = useState(comment.body);

    useEffect(() => {
        dispatch(fetchComment(commentId));
    }, [commentId])

    function changeBody(e) {
        setBody(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        dispatch(updateComment({body, id: commentId})).then(() => {setShowModal(false); history.push("/")});
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Body
                    <textarea onChange={changeBody} value={body}></textarea>
                </label>

                <input type="submit" value={"Update Comment"} />
            </form>
        </>
    )
}

export default EditComments;