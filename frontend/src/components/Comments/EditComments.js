import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, fetchComment, updateComment } from '../../store/comments';

const EditComments = ({commentId}) => {

    const dispatch = useDispatch();
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
        dispatch(updateComment({body, id: commentId}))
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