import { IPatient } from '@/types/patient';
import getConfig from 'next/config';
import axios from 'axios';

axios.defaults.baseURL = getConfig().publicRuntimeConfig.BASE_URL;
export const PatientService = {
  fetchPatients: (): Promise<IPatient[]> =>
    axios
      .get(`/patient`)
      .then((response) => response.data.patients as IPatient[]),

  createPatient: (patient: IPatient): Promise<IPatient> =>
    axios.post(`/patient`, patient).then((response) => response.data.patient),

  deletePatient: (patientId: string): Promise<IPatient> =>
    axios
      .delete(`/patient`, { data: { patientId } })
      .then((response) => response.data.success),

  updatePatient: (patient: IPatient): Promise<IPatient> =>
    axios.put(`/patient`, patient).then((response) => response.data.patient),
};
