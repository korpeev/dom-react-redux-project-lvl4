import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastify } from '../../services/toastify';
import { setModal } from '../../store/slices/app';
import { Formik, Form, Field } from 'formik';
import { channel as channelScheme } from '../../utils/validationSchemas.js';
import { errorBoundary } from '../../services/errorBoundary.js';

function Add({ handleClose, createEmit, channels }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const handleSubmit = ({ text }, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    dispatch(setModal({ status: 'pending' }));
    try {
      createEmit('newChannel', { name: text });
      dispatch(setModal({ status: 'fulfilled' }));
      toastify(t('notify.channelCreated'), 'success');
    } catch (e) {
      toastify(t(errorBoundary(e.response.status)), 'error');
    } finally {
      onSubmitProps.setSubmitting(false);
      handleClose();
    }
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={handleSubmit}
      validateOnSubmit
      validateOnChange
      validationSchema={channelScheme(channels.map((c) => c.name))}
    >
      {(
        {
          errors,
          handleChange,
          values,
          isSubmitting,
        },
      ) => (
        <Form>
          <Modal.Body>
            <Field name="text">
              {() => (
                <div className="d-flex flex-column align-items-center">
                  <span>{t('channelPanel.addChannelDescription')}</span>
                  <input name="text" className={`flex-fill mt-2 form-control ${errors.text ? 'is-invalid' : ''}`} type="text" value={values.text} onChange={handleChange} />
                  {errors.text && (
                  <span className="invalid-tooltip">{t(errors.text)}</span>
                  )}
                </div>
              )}
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isSubmitting} variant="danger" onClick={handleClose}>
              Закрыть
            </Button>
            <Button disabled={isSubmitting || errors.text?.length} variant="primary" type="submit">
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}

export default Add;
