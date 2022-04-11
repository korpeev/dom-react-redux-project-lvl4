import {
  ButtonGroup, Dropdown, Button,
} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveid } from '../../selectors/index.js';
import { setCurrentChannelId, setSelectedChannelId } from '../../store/slices/channel.js';
import { setModal } from '../../store/slices/app.js';

function ChannelListItem({ name, id, removable }) {
  const dispatch = useDispatch();
  const isActive = useSelector(selectActiveid(id));

  const handleChangeChannel = () => dispatch(setCurrentChannelId(id));
  const channelDeleteModal = () => {
    dispatch(setSelectedChannelId(id));
    dispatch(setModal({ type: 'delete', title: 'Удалить канал', active: 'true' }));
  };

  const channelRenameModal = () => {
    dispatch(setSelectedChannelId(id));
    dispatch(setModal({ type: 'rename', title: 'Переимновать канал', active: 'true' }));
  };
  return (
    <li className="list-group-item py-2 px-0" style={{ border: 'none' }}>
      <Dropdown className="w-100 d-flex align-items-lg-stretch" as={ButtonGroup}>
        <Button active={isActive} className="text-start flex-fill" onClick={handleChangeChannel} variant={isActive ? 'primary' : 'outline-secondary'}>{name}</Button>
        {removable && (
          <div>
            <Dropdown.Toggle className="flex-fill h-100" split size="sm" variant="primary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={channelRenameModal}>Rename</Dropdown.Item>
              <Dropdown.Item onClick={channelDeleteModal}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </div>
        )}

      </Dropdown>
    </li>
  );
}

export default ChannelListItem;
