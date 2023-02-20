import React from 'react';

import Moles from './moles';

type Props = {
  setFormIndex: React.Dispatch<React.SetStateAction<number>>,
  formIndex: number
};

const Navigation = ({ setFormIndex, formIndex }: Props): JSX.Element => (
  <div>
    {/* <Moles setFormIndex={setFormIndex} formIndex={formIndex} /> */}
  </div>
);

export default Navigation;
