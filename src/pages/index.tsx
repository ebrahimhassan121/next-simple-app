import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Paper,
  InputBase,
} from '@material-ui/core';

import { AccountBox, Add } from '@material-ui/icons';
import { useState } from 'react';
import { IPatient } from '@/types/patient';
import PatientsCard from '@/components/patients/patients-card';
import { PatientService } from '@/services/patient.service';

interface IProps {
  patients: IPatient[];
}
const useClasses = makeStyles((theme) => ({
  header: {
    p: `2px 4px`,
    display: `flex`,
    alignItems: `center`,
    padding: `2rem`,
    margin: `2rem 0px`,
  },
  input: { marginLeft: 8 },
  empty: {
    display: `flex`,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `center`,

    '& svg': {
      fontSize: `8rem`,
    },
    '& h6': {
      color: theme.palette.text.disabled,
    },
  },
}));
function Home(props: IProps) {
  const { patients } = props;
  const classes = useClasses();
  const [searchValue, setSearchValue] = useState(``);
  const [patientsData, setPatientsData] = useState(patients);
  const data = patientsData.filter((patient) =>
    patient.name.startsWith(searchValue),
  );
  const handleRemovePatient = (patient: IPatient) => {
    setPatientsData((prev) => prev.filter((ele) => ele.id !== patient.id));
  };
  return (
    <Container>
      <Paper className={classes.header}>
        <Typography variant="h4">Clinc</Typography>
        <InputBase
          fullWidth
          inputMode="search"
          className={classes.input}
          placeholder="Search by name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton href="/add-patient">
          <Add fontSize="large" />
        </IconButton>
      </Paper>
      <div>
        <Grid container spacing={2}>
          {data.map((patient) => (
            <Grid key={patient.id} item xs={12} sm={6}>
              <PatientsCard
                patient={patient}
                removePatientFromStore={handleRemovePatient}
              />
            </Grid>
          ))}
          {data.length ? null : (
            <div className={classes.empty}>
              <AccountBox color="disabled" />
              <Typography variant="h6">No patients found</Typography>
            </div>
          )}
        </Grid>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const patients = await PatientService.fetchPatients();
  return {
    props: {
      patients,
    },
  };
}
export default Home;
