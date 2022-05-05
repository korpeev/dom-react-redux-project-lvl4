import { Button, Modal } from 'react-bootstrap';
import React  from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastify } from '../../services/toastify';
import { Formik, Field, Form } from 'formik';
import { setModal } from '../../store/slices/app.js';
import { channel as channelScheme } from '../../utils/validationSchemas.js';
import { errorBoundary } from '../../services/errorBoundary.js';

export default function ({
  createEmit, selectedChannelId, handleClose, channels,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = ({ text }, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    dispatch(setModal({ status: 'pending' }));
    try {
      createEmit('renameChannel', { id: selectedChannelId, name: text });
      dispatch(setModal({ status: 'fulfilled' }));
      toastify(t('notify.channelRenamed'));
    } catch (e) {
      toastify(t(errorBoundary(e.response.code)), 'error');
    } finally {
      onSubmitProps.setSubmitting(false);
      handleClose();
    }
  };

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={channelScheme(channels.map((channel) => channel.name))}
      validateOnSubmit
      validateOnChange
    >
      {({
        errors,
        handleChange,
        values, isSubmitting,
      }) => (
        <Form>
          <Modal.Body>
            <Field name="text">
              {() => (
                <div className="d-flex flex-column align-items-center">
                  <span>
                    {' '}
                    {t('channelPanel.renameChannel', { channelName: '' })}
                    {' '}
                    !
                  </span>
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
            <Button disabled={isSubmitting} variant="primary" type="submit">
              Изменить
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}
