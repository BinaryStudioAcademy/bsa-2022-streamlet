import { StudioSidebar, StudioHome, StudioAnalystics } from '.';
import { IconName } from '../../../../common/enums/enums';

import { FC } from 'common/types/types';

import styles from './styles.module.scss';
import { useState } from 'react';

type Props = Record<string, unknown>;

const Studio: FC<Props> = () => {
  const [buttonName, setName] = useState<string>(IconName.HOME);

  const handleClick = (name: string): void => {
    setName(name);
  };

  return (
    <div className={styles.studio}>
      <StudioSidebar onClick={handleClick} />
      {buttonName === IconName.HOME ? <StudioHome /> : <StudioAnalystics />}
    </div>
  );
};
export { Studio };
