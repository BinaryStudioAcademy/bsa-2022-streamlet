import { FC } from 'common/types/types';
import { Icon } from '../../../../common/icon';
import { IconName, IconColor, AppRoute } from '../../../../../common/enums/enums';
import { Link } from '../../../../../components/common/common';

import styles from './styles.module.scss';
import { useState } from 'react';

type Props = {
  onClick: (payload: string) => void;
};

const arrayButtons = [IconName.HOME, IconName.ANALYSTICS];

const StudioSidebar: FC<Props> = ({ onClick }) => {
  const [activeButton, setActive] = useState<string>(IconName.HOME);
  const getColor = (item: string): string => (activeButton === item ? IconColor.GREEN : IconColor.WHITE);

  const handleClick = (item: string): void => {
    setActive(item);
    onClick(item);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.button}>
        <Link to={AppRoute.ROOT}>
          <Icon name={IconName.LOGO} />
        </Link>
      </div>
      {arrayButtons.map((item) => (
        <div className={`${styles.button} ${styles.active}`} onClick={(): void => handleClick(item)}>
          <Icon name={item} color={getColor(item)} />
        </div>
      ))}
    </aside>
  );
};

export { StudioSidebar };
