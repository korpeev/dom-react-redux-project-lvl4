import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setError, setModal } from '../../store/slices/app.js';

function Add({
  handleClose, createEmit, isDisabled,
}) {
  const dispatch = useDispatch();
  const { channel: { channels }, app } = useSelector((state) => state);
  const [text, setText] = useState('');
  const isUniqueText = channels.some((channel) => channel.name === text);
  const { t } = useTranslation();
  const handleSubmit = async () => {
    if (isUniqueText) {
      dispatch(setError({ text: t('errors.channelExists'), type: 'notUniqueText', isActive: true }));
      return;
    }
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
          <span>{t('channelPanel.addChannelDescription')}</span>
          <input className="flex-fill mt-2" type="text" value={text} onChange={handleChange} />
          {(app.error.isActive && app.error.type === 'notUniqueText') && <span className="text-danger">{app.error.text}</span>}
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
