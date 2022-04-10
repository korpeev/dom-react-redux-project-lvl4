import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/slices/message.js';
import { useSocket } from '../../context/SocketContext.jsx';

export default function MessageForm({ channelId, username }) {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  useEffect(() => {
    messageRef.current.focus();
  }, []);
  return (
    <div className="h-25">
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={(values, formikHelpers) => {
          const { resetForm } = formikHelpers;
          const messageData = {
            text: values.message,
            channelId,
            username,
          };
          dispatch(sendMessage({ messageData, socket, resetForm }));
        }}
      >
        {() => (
          <Form className="d-flex justify-content-between">
            <Field
              innerRef={messageRef}
              name="message"
              as="textarea"
              className="flex-fill "
              style={{ resize: 'none' }}
              rows="3"
            />
            <Button type="submit" className="mx-1 align-self-center">Send</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
