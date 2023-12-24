import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComments from './EditComments';

function EditCommentsModal({commentId, onClose}) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => {
    onClose();
  };

  return (
    <>
      <button onClick={() => {setShowModal(true); handleModalClick();}}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComments commentId={commentId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentsModal;