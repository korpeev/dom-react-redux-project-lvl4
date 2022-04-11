import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/slices/app.js';

export default function ({
  createEmit, selectedChannelId, handleClose, isDisabled,
}) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    dispatch(setModal({ status: 'pending' }));
    try {
      createEmit('renameChannel', { id: selectedChannelId, name: text });
      dispatch(setModal({ status: 'fulfilled' }));
      handleClose();
    } catch (e) {
    }
  };

  return (
    <>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <span>Напишите название канала!</span>
          <input className="flex-fill mt-2" type="text" value={text} onChange={handleChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={isDisabled} variant="danger" onClick={handleClose}>
          Закрыть
        </Button>
        <Button disabled={isDisabled} variant="primary" onClick={handleSubmit}>
          Изменить
        </Button>
      </Modal.Footer>
    </>
  );
}
