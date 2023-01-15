import React from 'react';
import clsx from 'clsx';
import Scrollbars from 'react-custom-scrollbars-2';

import Checkboxes from 'components/form/Checkboxes';
import Select from 'components/form/Select';
import styles from './styles.module.scss';

const ageOptions = [
  { label: 'Yes', value: 'YES', isRadio: true, isRadioButton: true },
];

const transportation = [
  { label: 'Yes', value: 'YES', isRadio: true, isRadioButton: true },
  { label: 'No', value: 'NO', isRadio: true, isRadioButton: true },
];

const chicagoPurdueTransportation = [
  { label: 'Chicago', value: 'CHICAGO', isRadio: true, isRadioButton: true },
  { label: 'Purdue', value: 'PURDUE', isRadio: true},
  { label: 'N/A', value: 'N/A', isRadio: true, isRadioButton: true },
];

const PersonalInfoP3 = (): JSX.Element => (
  <Scrollbars className={clsx(styles.screen, styles.personalInfo)} renderView={(props) => <div className={styles.scrollbox} {...props} />} renderTrackHorizontal={(props) => <div className={styles.horizontalScrollbar} {...props} />}>
    <h1 className={styles.title}>Personal Information</h1>
    <p className={styles.text}>Are you aware you have to be 18 by the start of our event (February 24th, 2023)?</p>
    <Checkboxes
      className={styles.checkboxes}
      name="ageMin"
      options={ageOptions}
    />
    <p className={styles.text}>Are you aware that this event will be in person and that you will be responsible for transportation (We will have buses from Chicago and Purdue in limited quantity)?</p>
    <Select
      className={styles.select}
      name="selfTransport"
      options={transportation}
      placeholder="Choose an Answer"
      menuPlacement="top"
      // creatable
    />
    <p className={styles.text}>Will you require transportation from either Chicago or West Lafayette? (We cannot guarantee spots on the bus, we will send information about buses closer to the event)?</p>
    <Select
      className={styles.select}
      name="chicagoPurdueTransport"
      options={chicagoPurdueTransportation}
      placeholder="Choose an Answer"
      menuPlacement="top"
      // creatable
    />
  </Scrollbars>
);

export default PersonalInfoP3;
