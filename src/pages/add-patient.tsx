import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  makeStyles,
  Paper,
  styled,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { Close } from '@material-ui/icons';
import * as yup from 'yup';
import { PatientService } from '@/services/patient.service';
import CustomSnackbar from '@/components/custom-snackbar';

const useStyle = makeStyles({
  container: {
    minHeight: `100vh`,
  },
  headerContainer: {
    p: `2px 4px`,
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    padding: 8,
    margin: `2rem 0px`,
  },
  snackBarError: {
    backgroundColor: `red`,
  },
  snackBarSuccess: {
    backgroundColor: `green`,
  },
});
const StyledTextField = styled(TextField)({
  margin: `0.5rem 0px`,
});
const AddPatient = () => {
  const styles = useStyle();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: ``,
    success: false,
  });
  const closeSnackBar = () => {
    setApiResponse({ message: ``, success: false });
  };
  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        name: ``,
        age: ``,
        address: ``,
        phone: ``,
        healthInfo: ``,
      },
      validationSchema: yup.object({
        name: yup.string().required(`Name is required`),
        age: yup
          .number()
          .transform((value) => (Number.isNaN(value) ? undefined : value))
          .required(`Age is required`),
        address: yup.string().required(`Address is required`),
        phone: yup.string().required(`Phone is required`),
        healthInfo: yup.string().required(`HealthInfo is required`),
      }),
      onSubmit: (formValues) => {
        setLoading(true);
        PatientService.createPatient(formValues)
          .then((patient) => {
            setApiResponse({
              message: `Patient ${patient.name} created successfully`,
              success: true,
            });
            resetForm();
          })
          .catch((error) => {
            setApiResponse({
              message: error?.message || `something went wrong`,
              success: false,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  const CustomTextField = ({
    id,
    ...inputProps
  }: { id: keyof typeof values } & TextFieldProps) => (
    <StyledTextField
      {...inputProps}
      fullWidth
      label={id.toUpperCase()}
      id={id}
      onChange={handleChange}
      variant="filled"
      value={values[id]}
      error={touched[id] && !!errors[id]}
      helperText={touched[id] && errors[id]}
    />
  );
  return (
    <Container className={styles.container}>
      <Paper className={styles.headerContainer}>
        <Typography variant="h4">Add Patient</Typography>
        <IconButton href="/">
          <Close />
        </IconButton>
      </Paper>
      <form onSubmit={handleSubmit}>
        {CustomTextField({ id: `name` })}
        {CustomTextField({ id: `age` })}
        {CustomTextField({ id: `phone` })}
        {CustomTextField({ id: `address` })}
        {CustomTextField({ id: `healthInfo`, multiline: true, maxRows: 10 })}
        <Button disabled={loading} fullWidth variant="contained" type="submit">
          Add patient
          {loading && <CircularProgress size="1rem" />}
        </Button>
      </form>
      <CustomSnackbar
        closeSnackBar={closeSnackBar}
        message={apiResponse.message}
        success={apiResponse.success}
      />
    </Container>
  );
};
export default AddPatient;
