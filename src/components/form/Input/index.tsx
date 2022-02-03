import React from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';
import StyledInput from './StyledInput';
import HelpIcon from './HelpIcon';
import styles from './styles.module.scss';

type PropTypes = {
  name: string,
  multiline?: boolean;
  helpLink?: string;
  linkColor?: string;
  [key: string]: unknown;
};

const Input = ({ name, multiline, helpLink, linkColor = 'white', ...props }: PropTypes): JSX.Element => {
  const { register } = useFormContext();

  return (
    <>
      <div className={styles.inputContainer}>
        <StyledInput type="text" name={name} multiline={multiline} {...props} ref={register} />
        {helpLink && (
          <a className={styles.helpLink} href={helpLink} target="_blank" rel="noreferrer" title="Where can I find my Discord username?">
            <HelpIcon color={linkColor} />
          </a>
        )}
      </div>
      <ErrorMessage name={name} />
    </>
  );
};

export default Input;
