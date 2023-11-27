import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OneComment from "./OneComment";
import { getComments, fetchComments } from '../../store/comments';
import "./Comments.css"


function AllComments({postId}) {
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts[postId])
    const comments = useSelector(state => post?.commentIds?.map(commentId => {
        if (state?.comments[commentId]) {
            return state?.comments[commentId];
        } else {
            return;
        }
    }));

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [])
    // debugger

    return(
        <>
            <ul>
                {comments?.reverse().map(comment => {
                    if (comment) {
                        return <OneComment comment={comment} key={comment?.id}/>
                    }
                })}
            </ul>
        </>
    )
}

export default AllComments;