import React from 'react';
import clsx from 'clsx';

import Checkboxes from 'components/form/Checkboxes';
import Select from 'components/form/Select';
import styles from './styles.module.scss';

const interestOptions = [
  { label: 'Attending technical workshops', value: 'Attending technical workshops' },
  { label: 'Submitting a project to win prizes', value: 'Submitting a project to win prizes' },
  { label: 'Mini-Events (e.g. game tournaments)', value: 'Mini-Events (e.g. game tournaments)' },
  { label: 'Meeting new people', value: 'Meeting new people' },
  { label: 'Working with mentors to get feedback', value: 'Working with mentors to get feedback' },
  { label: 'Company Q&As and Networking events', value: 'Company Q&As and Networking events' },
  { label: 'Pitching Shark Tank projects', value: 'Pitching Shark Tank projects' },
  { label: 'Other', value: 'Other', isOther: true },
];

const learnOptions = [
  { label: 'Slack', value: 'Slack' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Linkedin', value: 'Linkedin' },
  { label: 'Reddit', value: 'Reddit' },
  { label: 'Word of Mouth', value: 'Word of Mouth' },
];

const Event = (): JSX.Element => (
  <div className={clsx(styles.screen, styles.eventQuestions)}>
    <h1 className={styles.title}>Hack-Illinois Specific Questions</h1>
    <span>Which of these aspects of the hackathon would you most be interested in engaging in?</span>
    <Checkboxes
      className={styles.checkboxes}
      name="hackathonInterest"
      options={interestOptions}
    />
    <br />
    <br />
    <span>How did you hear of HackIllinois?</span>
    <Select name="outreachSurvey" options={learnOptions} menuPlacement="top" placeholder="Where did you hear about us? *" creatable />
    <br />
    <br />
    <br />
  </div>
);

export default Event;
