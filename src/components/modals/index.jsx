import React, { useCallback, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAppState, getChannelState } from 'selectors/index';
import { setModal } from 'store/slices/app';
import { useSocket } from 'context/SocketContext';
import Add from './Add';
import Delete from './Delete';
import Rename from './Rename';

const modals = {
  add: Add,
  delete: Delete,
  rename: Rename,
};
export default function () {
  const createEmit = useSocket();
  const { modal } = useSelector(getAppState);
  const { channel: { channels } } = useSelector((state) => state);
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
        channels={channels}
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
