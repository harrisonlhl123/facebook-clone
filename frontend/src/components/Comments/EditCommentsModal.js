import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComments from './EditComments';

function EditCommentsModal({commentId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComments commentId={commentId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentsModal;