import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import formStyles from '../../form-controls.module.scss';
import clsx from 'clsx';

type Props = {
  route: string;
  prompt: string;
  linkTitle: string;
  className?: string;
};

const ContinueWithParagraph: FC<Props> = ({ linkTitle, prompt, route, className }) => {
  return (
    <p className={clsx(styles['continue-with-paragraph'], className)}>
      {prompt}
      <Link to={route} className={clsx(styles['auth-link'], formStyles['link'])}>
        {linkTitle}
      </Link>
    </p>
  );
};

export { ContinueWithParagraph };
