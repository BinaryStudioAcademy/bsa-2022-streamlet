import { FC } from 'common/types/types';
import { Icon } from 'frontend/src/components/common/common';
import { IconName, IconColor, AppRoutes, AppRoute } from 'common/enums/enums';
import cn from 'clsx';
import { ISideBarItem, sideBarItems } from './config';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

const StudioSidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <NavLink to={AppRoutes.ROOT}>
        <div className={styles.button}>
          <Icon name={IconName.LOGOTIP} />
        </div>
      </NavLink>

      {sideBarItems.map((item: ISideBarItem) => (
        <NavLink key={item.itemName} to={item.routeName as AppRoute}>
          {({ isActive }): ReactNode => {
            return (
              <div className={cn(styles.button, styles['hover-item'])}>
                <Icon name={item.itemName} color={isActive ? IconColor.GREEN : IconColor.WHITE} />
              </div>
            );
          }}
        </NavLink>
      ))}
    </aside>
  );
};

export { StudioSidebar };
