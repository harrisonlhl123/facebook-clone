import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import MakePosts from './MakePosts';
import { useSelector } from 'react-redux';

function MakePostsModal({feedId}) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  return (
    <>
        <div className='make-post'>
            <div className="post-profile-pic">
                <img src={`${currentUser?.pfp}`} />
            </div>
            <button id="post-button" onClick={() => {setShowModal(true)}}>What's on your mind?</button>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MakePosts setShowModal={setShowModal} feedId={feedId}/>
        </Modal>
      )}
    </>
  );
}

export default MakePostsModal;