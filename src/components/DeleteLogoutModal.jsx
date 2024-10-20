import Modal from 'react-modal';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function DeleteLogoutModal({
  modalIsOpen,
  closeModal,
  modalContent,
  modalType,
  modalFunction,
}) {
  const { customModalStyles } = useContext(AppContext);

  return (
    <Modal
      className={'logout-delete-modal flex-center'}
      style={customModalStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className='modal-content'>{modalContent}</div>
      <div className='confirm-button button' onClick={modalFunction}>
        Yes, {modalType}
      </div>
      <div className='cancel-button button' onClick={closeModal}>
        Cancel
      </div>
    </Modal>
  );
}
