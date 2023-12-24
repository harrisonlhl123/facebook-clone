import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPosts from './EditPosts';

function EditPostsModal({postId, onClose}) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => {
    onClose();
  };

  return (
    <>
      <button onClick={() => {setShowModal(true); handleModalClick();}}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPosts postId={postId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostsModal;