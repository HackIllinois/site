import React from 'react';
import clsx from 'clsx';

import Checkboxes from 'components/form/Checkboxes';
import Select from 'components/form/Select';
import styles from './styles.module.scss';

const formatYears = (years: number) => `${years} year${years === 1 ? '' : 's'}`;
const programmingYearsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .map((years) => ({
    value: years,
    label: years === 10 ? '10+' : years, //formatYears(years),
    isRadio: true, 
    isRadioButton: true
  }));

const abilityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .map((years) => ({
    value: years,
    label: years, //formatYears(years),
    isRadio: true, 
    isRadioButton: true
  }));



// const abilityOptions = [
//   { value: 1, label: '1 - What is code?' },
//   { value: 2, label: '2 - I am familiar with code, but need guidance. ' },
//   { value: 3, label: '3 - I am comfortable working on independent projects.' },
//   { value: 4, label: '4 - I am comfortable writing and reviewing production level code.' },
//   { value: 5, label: '5 - I am code.' },
// ];

// const internshipOptions = [
//   { value: 'YES', label: 'Yes' },
//   { value: 'NO', label: 'No' },
// ];


let value = false;

const handleChange = () => {
  value = !value;
};

// const yearOptions = [
//   { label: '1', value: '1', isRadio: true, isRadioButton: true },
//   { label: '2', value: '2', isRadio: true, isRadioButton: true },
//   { label: '3', value: '3', isRadio: true, isRadioButton: true },
//   { label: '4', value: '4', isRadio: true, isRadioButton: true },
//   { label: '5', value: '5', isRadio: true, isRadioButton: true },
//   { label: '6', value: '6', isRadio: true, isRadioButton: true },
//   { label: '7', value: '7', isRadio: true, isRadioButton: true },
//   { label: '8', value: '8', isRadio: true, isRadioButton: true },
//   { label: '9', value: '9', isRadio: true, isRadioButton: true },
//   { label: '10+', value: '10+', isRadio: true, isRadioButton: true },
// ];

// const skillOptions = [
//   { label: '1', value: '1', isRadio: true, isRadioButton: true },
//   { label: '2', value: '2', isRadio: true, isRadioButton: true },
//   { label: '3', value: '3', isRadio: true, isRadioButton: true },
//   { label: '4', value: '4', isRadio: true, isRadioButton: true },
//   { label: '5', value: '5', isRadio: true, isRadioButton: true },
//   { label: '6', value: '6', isRadio: true, isRadioButton: true },
//   { label: '7', value: '7', isRadio: true, isRadioButton: true },
//   { label: '8', value: '8', isRadio: true, isRadioButton: true },
//   { label: '9', value: '9', isRadio: true, isRadioButton: true },
//   { label: '10', value: '10', isRadio: true, isRadioButton: true },
// ];

const ExperienceP2 = (): JSX.Element => (
  <div className={clsx(styles.screen, styles.experience)}>
    <h1 className={styles.title}>Prior Experience</h1>
    <p className={styles.text}>How many years have you been programming?</p>
    <Checkboxes
      className={styles.checkboxes}
      name="programmingYears"
      options={programmingYearsOptions}
    />
    <p className={styles.text}>How would you rate your programming ability (1 - beginner, 10 - legend)?</p>
    {/* <p className={styles.fixNoteLeft}>what’s... code?</p> */}
    <Checkboxes
      className={styles.checkboxes}
      name="programmingAbility"
      options={abilityOptions}
    />
    {/* <p className={styles.fixNoteRight}>I eat code for breakfast</p> */}
  </div>
);

export default ExperienceP2;
