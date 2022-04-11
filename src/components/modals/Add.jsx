import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/slices/app.js';

function Add({
  handleClose, createEmit, isDisabled,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    dispatch(setModal({ status: 'pending' }));
    try {
      await createEmit('newChannel', { name: text });
      dispatch(setModal({ status: 'fulfilled' }));
    } catch (e) {
      console.log(e);
    } finally {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
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
          Добавить
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Add;
