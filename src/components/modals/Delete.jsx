import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/slices/app.js';

export default function ({
  handleClose, isDisabled, selectedChannelId, createEmit,
}) {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(setModal({ status: 'pending' }));
    try {
      dispatch(setModal({ status: 'fulfilled' }));
      await createEmit('removeChannel', { id: selectedChannelId });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <span>Удалить канал ?</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={isDisabled} variant="danger" onClick={handleClose}>
          Закрыть
        </Button>
        <Button disabled={isDisabled} variant="primary" onClick={handleSubmit}>
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
}