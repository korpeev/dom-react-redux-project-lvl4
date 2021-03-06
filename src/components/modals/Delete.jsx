import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastify } from '../../services/toastify';
import { setModal } from '../../store/slices/app';
import { errorBoundary } from '../../services/errorBoundary.js';

export default function ({
  handleClose, isDisabled, selectedChannelId, createEmit,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = async () => {
    dispatch(setModal({ status: 'pending' }));
    try {
      dispatch(setModal({ status: 'fulfilled' }));
      await createEmit('removeChannel', { id: selectedChannelId });
      toastify(t('notify.channelRemoved'), 'error');
      handleClose();
    } catch (e) {
      toastify(t(errorBoundary(e.response.status)), 'error');
    }
  };

  return (
    <>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <span>
            {t('channelPanel.removeChannel', { channelName: '' })}
            {' '}
            ?
          </span>
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
