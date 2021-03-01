import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { ChangeEvent, SyntheticEvent } from "react";

const validationSchema = yup.object({
  initialAmount: yup
    .number()
    .positive("Initial Amount should be positive")
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

export default function SimpleFutureValue() {
  const formik = useFormik({
    initialValues: {
      initialAmount: 0,
      interestRate: 0,
      periods: 12,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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

  /**
   * calculate Future Value.
   * @constructor
   * @param {number} interestRate - Percent of interest rate per period.
   */
  function calculateFV(
    presentValue: number,
    interestRate: number,
    periods: number
  ): number {
    return presentValue * Math.pow(1 + interestRate / 100, periods);
  }

  return (
    <Form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <TextField
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
      <TextField
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
      <TextField
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
}

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
