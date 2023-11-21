import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comments';
import { getUser } from '../../store/users';
import "./Comments.css"


function MakeComments({postId}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser?.id
    const user = useSelector(getUser(userId))


    const [body, setBody] = useState("");

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setBody("");
        dispatch(createComment({body, userId, postId}));

    }

    return(
        <div id="make-comment">
            <div className="comment-profile-pic">
                <img src={`${user?.pfp}`}/>
            </div>
            <form onSubmit={handleSubmit} >
                <label>
                    <textarea onChange={changeBody} value={body} placeholder="Write a comment" id="text-area-comment"></textarea>
                </label>

                <div id="create-comment-button">
                    <input type="submit" value="Send" />
                </div>
            </form>
        </div>
    )
}

export default MakeComments;