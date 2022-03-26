import { render } from '@testing-library/react';
import AddPatient from '@/pages/add-patient';

describe(`@/components/pages/add-patient`, () => {
  it(`should render add patient page correctly`, () => {
    const { container } = render(<AddPatient />);
    expect(container).toMatchSnapshot();
  });
});
