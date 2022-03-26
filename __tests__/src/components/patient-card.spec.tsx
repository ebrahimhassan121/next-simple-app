import { render } from '@testing-library/react';
import PatientCard from '@/components/patients/patients-card';
import { IPatient } from '@/types/patient';

describe(`@/components/patients/patients-card`, () => {
  it(`should render patients card correctly`, () => {
    const patient: IPatient = {
      address: ``,
      age: 10,
      id: ``,
      healthInfo: `bla bla bla`,
      name: `ahmed`,
      phone: `0123456789`,
    };
    const removePatientFromStore = jest.fn();
    const { container } = render(
      <PatientCard
        patient={patient}
        removePatientFromStore={removePatientFromStore}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
