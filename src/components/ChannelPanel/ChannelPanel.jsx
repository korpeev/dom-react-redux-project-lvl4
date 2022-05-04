import { Button, ListGroup } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setModal } from 'store/slices/app';
import { getChannelState } from 'selectors/index';
import ChannelListItem from './ChannelListItem';

function ChannelPanel() {
  const { channels } = useSelector(getChannelState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openModal = () => {
    dispatch(setModal({ active: true, title: t('channelPanel.addChannel'), type: 'add' }));
  };
  return (
    <div className="col-4 col-md-2 border-end pt-5">
      <div className="d-flex align-items-start pb-0 justify-content-between">
        <span>{t('channels')}</span>
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
