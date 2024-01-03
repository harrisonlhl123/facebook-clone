import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, uploadPost } from '../../store/posts';
import { getUser } from '../../store/users';
import "./Posts.css"


function MakePosts({feedId, setShowModal}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const [photoFile, setPhotoFile] = useState();
    const [photoURL, setPhotoURL] = useState();

    const handleRemovePhoto = (e) => {
        e.preventDefault();
        setPhotoFile(null);
        setPhotoURL(null);
      };
    
      const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => setPhotoURL(fileReader.result);
        }
      };


    const [body, setBody] = useState("");

    function changeBody(e) {
        setBody(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const authorId = user.id;

        const postFeedId = feedId || currentUser?.id;

        if (!photoURL) {
            return dispatch(createPost({ body, feed_id: postFeedId }));
          } else {
            const newPost = new FormData();
            newPost.append("post[body]", body);
            // newPost.append("post[authorId]", authorId);
            newPost.append("post[feed_id]", postFeedId);
            newPost.append("post[photo]", photoFile);
            dispatch(uploadPost({ newPost }));
          }
        
        setBody("");
        setShowModal(false);
    }

    return(
        <div className={`make-post ${photoURL ? 'with-image' : ''}`}>
            <div className="post-profile-pic">
                <img src={`${currentUser?.pfp}`} />
            </div>
            <form onSubmit={handleSubmit} >
                <label>
                    <textarea onChange={changeBody} value={body} placeholder="What's on your mind?" id="text-area-post"></textarea>
                </label>

                <div className="post-photo-container">
                    {photoURL && (
                    <>
                        <div className="image-preview">
                            <img alt="" src={photoURL} id="preview" />
                            <img
                                onClick={handleRemovePhoto}
                                id="remove-post-image"
                                alt=""
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
                            />
                        </div>
                    </>
                    )}
                    <div className="post-photo-button">
                        <label htmlFor="upload-image" className="custom-upload-btn">
                            Upload an Image <i className="fa-solid fa-image"></i>
                        </label>
                        <input
                            type="file"
                            id="upload-image"
                            className="upload-image"
                            onChange={(e) => handleFile(e)}
                        />
                    </div>
                </div>

                <div id="create-post-button">
                    <input type="submit" value="Create Post" />
                </div>
            </form>
        </div>
    )
}

export default MakePosts;