import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OneComment from "./OneComment";
import { getComments, fetchComments } from '../../store/comments';
import "./Comments.css"


function AllComments() {
    const dispatch = useDispatch();
    const comments = useSelector(getComments);

    useEffect(() => {
        dispatch(fetchComments());
    }, [])

    return(
        <>
            <ul>
                {Object.values(comments).reverse().map(comment => {
                    return <OneComment comment={comment} key={comment.id}/>
                })}
            </ul>
        </>
    )
}

export default AllComments;