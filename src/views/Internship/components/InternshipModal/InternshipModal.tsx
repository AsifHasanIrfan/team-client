import {
  InternshipModalProps,
  InternShipSubscribeFormIntialvalue,
} from '@config/types';
import { Formik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import InternshipModalForm from '../InternshipModalForm';

const initialValues: InternShipSubscribeFormIntialvalue | any = {
  email: '',
  name: '',
};

const subscribeFormValidationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
});

function InternshipModal({ setIsOpen }: InternshipModalProps) {
  const handleSubscribe = () => {
    setIsOpen(false);
    Swal.fire({
      icon: 'success',
      iconColor: '#C10206',
      title: 'Your subscribed successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubscribe}
      validationSchema={subscribeFormValidationSchema}
    >
      {({ handleSubmit }) => {
        return <InternshipModalForm handleSubmit={handleSubmit} />;
      }}
    </Formik>
  );
}

export default InternshipModal;
