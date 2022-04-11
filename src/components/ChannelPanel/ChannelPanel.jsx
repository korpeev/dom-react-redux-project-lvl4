import { Button, ListGroup } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelListItem from './ChannelListItem.jsx';
import { setModal } from '../../store/slices/app.js';
import { getChannelState } from '../../selectors/index.js';

function ChannelPanel() {
  const { channels } = useSelector(getChannelState);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModal({ active: true, title: 'Добавить канал', type: 'add' }));
  };
  return (
    <div className="col-4 col-md-2 border-end pt-5">
      <div className="d-flex align-items-start pb-0 justify-content-between">
        <span>Каналы</span>
        <Button onClick={openModal} variant="outline-primary" size="sm">+</Button>
      </div>
      <ListGroup className="mt-2">
        {channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            id={channel.id}
            name={channel.name}
            removable={channel.removable}
          />
        ))}
      </ListGroup>
    </div>
  );
}

export default ChannelPanel;
