import { PatientService } from '@/services/patient.service';
import { IPatient } from '@/types/patient';
import {
  Card,
  Typography,
  styled,
  CardActions,
  IconButton,
  Divider,
  InputBase,
  InputBaseProps,
  CircularProgress,
} from '@material-ui/core';
import { Delete, Edit, Close, Sync } from '@material-ui/icons';
import { useFormik } from 'formik';

import React, { useState } from 'react';
import CustomSnackbar from '../custom-snackbar';

interface IPatientCardProps {
  patient: IPatient;
  removePatientFromStore: (patient: IPatient) => void;
}
const CustomizedCard = styled(Card)(({ theme }) => ({
  position: `relative`,
  marginBottom: `8px`,
  color: theme.palette.text.primary,
  borderRadius: `12px`,
  borderWidth: `0px`,
  transition: `0.1s`,
  '&:hover': {
    boxShadow: `4px 4px 25px 0px rgba(0,0,0,0.75)`,
    transform: `scale(1.09)`,
    zIndex: 10,
  },
}));
const CustomizedCardItemInfo = styled(Typography)(({ theme }) => ({
  padding: `8px`,
  '& .title': {
    color: theme.palette.text.primary,
    fontWeight: `bold`,
  },
}));

const CustomizedCardLoadingContainer = styled(`div`)(() => ({
  position: `absolute`,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `rgba(0,0,0,0.7)`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  color: `white`,
}));
interface IPatientCardItemInfo extends InputBaseProps {
  title: string;
}
const PatientCardItemInfo = ({
  title,
  disabled,
  ...props
}: IPatientCardItemInfo) => (
  <>
    <CustomizedCardItemInfo variant="body1">
      <b className="title">{title}: </b>
      {disabled ? props.value : <InputBase {...props} fullWidth />}
    </CustomizedCardItemInfo>
    <Divider />
  </>
);
const PatientCard = (props: IPatientCardProps) => {
  const { patient } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: ``,
  });
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: patient,
    onSubmit: (formValues) => {
      setIsLoading(true);
      PatientService.updatePatient(formValues)
        .then(() => {
          setApiResponse({
            success: true,
            message: `successfully updated ${formValues.name}`,
          });
          setIsEdit(false);
          setIsLoading(false);
        })
        .catch((error) => {
          setApiResponse({
            success: false,
            message: error.message,
          });
          setIsLoading(false);
        });
    },
  });
  const handleDelete = () => {
    setIsLoading(true);
    PatientService.deletePatient(`${patient.id}`)
      .then(() => {
        props.removePatientFromStore(patient);
      })
      .catch((error) => {
        setApiResponse({
          success: false,
          message: error.message,
        });
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <CustomizedCard variant="outlined">
        <PatientCardItemInfo
          name="name"
          id="name"
          onChange={handleChange}
          disabled={!isEdit}
          title="Name"
          value={values.name}
        />
        <PatientCardItemInfo
          disabled={!isEdit}
          name="age"
          id="age"
          onChange={handleChange}
          title="Age"
          value={values.age.toString()}
        />
        <PatientCardItemInfo
          name="phone"
          id="phone"
          onChange={handleChange}
          disabled={!isEdit}
          title="Phone"
          value={values.phone}
        />
        <PatientCardItemInfo
          name="address"
          id="address"
          onChange={handleChange}
          disabled={!isEdit}
          title="Address"
          value={values.address}
        />
        <PatientCardItemInfo
          name="healthInfo"
          id="healthInfo"
          onChange={handleChange}
          disabled={!isEdit}
          title="HealthInfo"
          multiline
          maxRows={10}
          fullWidth
          value={values.healthInfo}
        />
        <CardActions style={{ justifyContent: `flex-end` }}>
          <>
            <IconButton
              onClick={() => {
                setIsEdit((prev) => !prev);
                resetForm();
              }}
              aria-label="edit"
            >
              {isEdit ? <Close /> : <Edit />}
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => (isEdit ? handleSubmit() : handleDelete())}
            >
              {isEdit ? <Sync /> : <Delete color="error" />}
            </IconButton>
          </>
        </CardActions>
        {isLoading && (
          <CustomizedCardLoadingContainer>
            <CircularProgress size="4rem" color="inherit" />
          </CustomizedCardLoadingContainer>
        )}
      </CustomizedCard>
      <CustomSnackbar
        {...apiResponse}
        closeSnackBar={() => setApiResponse({ success: false, message: `` })}
      />
    </form>
  );
};

export default PatientCard;
