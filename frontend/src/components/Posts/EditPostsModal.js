import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPosts from './EditPosts';

function EditPostsModal({postId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPosts postId={postId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostsModal;