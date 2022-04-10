import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import ChannelListItem from './ChannelListItem.jsx';
import { selectChannelLists } from '../../selectors/index.js';

function ChannelPanel() {
  const channelsList = useSelector(selectChannelLists);
  return (
    <div className="col-4 col-md-2 border-end pt-5">
      <div className="d-flex align-items-start pb-0 justify-content-between">
        <span>Каналы</span>
        <Button variant="outline-primary" size="sm">+</Button>
      </div>
      <ListGroup className="mt-2">
        {channelsList.map((channel) => (
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
