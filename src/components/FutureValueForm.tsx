import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  initialAmount: yup
    .number()
    .positive("Initial amount should be positive")
    .required("Initial amount is required"),
  interestRate: yup
    .number()
    .positive("Interest rate should be positive")
    .required("Interest rate is required"),
  periods: yup
    .number()
    .positive("Periods should be positive")
    .required("Periods is required"),
});

const FutureValueForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      initialAmount: 0,
      interestRate: 0,
      periods: 12,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      router.push({
        pathname: "/result/future-value",
        query: { ...values },
      });
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // get name and value from event.target
    // is the same as const name = event.target.name
    const { name, value } = event.target;

    // make sure you have name prop in
    // your textfield and it is same name as your initial state
    formik.setFieldValue(name, value); // this call formik to set your value
  };

  return (
    <Form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <InputField
        name="initialAmount"
        label="Valor inicial"
        type="number"
        value={formik.values.initialAmount}
        onChange={handleChange}
        error={
          formik.touched.initialAmount && Boolean(formik.errors.initialAmount)
        }
        helperText={formik.touched.initialAmount && formik.errors.initialAmount}
      />
      <InputField
        name="interestRate"
        label="Taxa % por período"
        type="number"
        value={formik.values.interestRate}
        onChange={handleChange}
        error={
          formik.touched.interestRate && Boolean(formik.errors.interestRate)
        }
        helperText={formik.touched.interestRate && formik.errors.interestRate}
      />
      <InputField
        name="periods"
        label="Num. de períodos"
        type="number"
        value={formik.values.periods}
        onChange={handleChange}
        error={formik.touched.periods && Boolean(formik.errors.periods)}
        helperText={formik.touched.periods && formik.errors.periods}
      />
      <SubmitButton variant="contained" color="primary" type="submit">
        Calculate
      </SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const SubmitButton = styled(Button)`
  && {
    margin-top: 10px;
  }
`;

const InputField = styled(TextField)`
  && {
    margin-top: 20px;
  }
`;

export default FutureValueForm;
