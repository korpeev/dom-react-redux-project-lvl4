import React, { useCallback, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Add from './Add.jsx';
import { getAppState, getChannelState } from '../../selectors/index.js';
import { setModal } from '../../store/slices/app.js';
import { useSocket } from '../../context/SocketContext.jsx';
import Delete from './Delete.jsx';
import Rename from './Rename.jsx';

const modals = {
  add: Add,
  delete: Delete,
  rename: Rename,
};
export default function () {
  const createEmit = useSocket();
  const { modal } = useSelector(getAppState);
  const { selectedChannelId } = useSelector(getChannelState);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModal({ active: false }));
  };

  const isDisabled = modal.status === 'pending';

  const renderModal = useMemo(() => {
    if (modal.type === null) {
      return null;
    }
    const Component = modals[modal.type];
    return (
      <Component
        isDisabled={isDisabled}
        selectedChannelId={selectedChannelId}
        createEmit={createEmit}
        handleClose={handleClose}
        modal={modal}
      />
    );
  }, [modal, selectedChannelId, createEmit]);

  return (
    <Modal show={modal.active} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modal.title}</Modal.Title>
      </Modal.Header>
      {renderModal}
    </Modal>
  );
}
