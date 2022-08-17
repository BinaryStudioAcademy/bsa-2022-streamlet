import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
  route: string;
  prompt: string;
  linkTitle: string;
};

const ContonueWithParagraph: FC<Props> = ({ linkTitle, prompt, route }) => {
  return (
    <p className={styles['continue-with-paragraph']}>
      {prompt}
      <Link to={route} className={styles['auth-link']}>
        {linkTitle}
      </Link>
    </p>
  );
};

export { ContonueWithParagraph };
