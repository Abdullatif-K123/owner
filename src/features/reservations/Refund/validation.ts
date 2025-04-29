import * as yup from 'yup';

export const refundFormSchema = yup.object().shape({
  tourId: yup.string().trim().required('الحقل مطلوب'),
  tourCustomerChairId: yup.string().trim().required('الحقل مطلوب'),
  amount: yup.number().required('الحقل مطلوب'),
});

export const refundFormDefault = {
  tourId: '',
  tourCustomerChairId: '',
  amount: 0,
};
