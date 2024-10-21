import Modal from 'react-modal';
import { useAppContext } from '../context/AppContext';

export default function DeleteLogoutModal({
  modalIsOpen,
  closeModal,
  modalContent,
  modalType,
  modalFunction,
}) {
  const { customModalStyles } = useAppContext();

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
