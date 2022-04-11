import React from 'react';

export default function MessageItem({ username, text }) {
  return (
    <div className="text-break">
      <b>
        {username}
        :
      </b>
      {text}
    </div>
  );
}
