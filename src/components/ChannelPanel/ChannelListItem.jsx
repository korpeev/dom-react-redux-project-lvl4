import {
  ButtonGroup, Dropdown, Button, ListGroupItem,
} from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveid } from '../../selectors/index.js';
import { setCurrentChannelId } from '../../store/slices/channel.js';

function ChannelListItem({ name, id, removable }) {
  const dispatch = useDispatch();
  const isActive = useSelector(selectActiveid(id));
  const handleChangeChannel = () => dispatch(setCurrentChannelId(id));

  return (
    <li className="list-group-item py-2 px-0" style={{ border: 'none' }}>
      <Dropdown className="w-100 d-flex align-items-lg-stretch" as={ButtonGroup}>
        <Button active={isActive} className="text-start flex-fill" onClick={handleChangeChannel} variant={isActive ? 'primary' : 'outline-secondary'}>{name}</Button>
        {removable && (
          <div>
            <Dropdown.Toggle className="flex-fill h-100" split size="sm" variant="primary" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item>Rename</Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </div>
        )}

      </Dropdown>
    </li>
  );
}

export default ChannelListItem;
