import { FC } from 'common/types/types';
import { Icon } from 'frontend/src/components/common/common';
import { IconName, AppRoutes, AppRoute } from 'common/enums/enums';
import cn from 'clsx';
import { ISideBarItem, sideBarItems } from './config';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

const StudioSidebar: FC = () => {
  return (
    <aside className={styles['sidebar']}>
      <NavLink to={AppRoutes.ROOT}>
        <div className={styles['logo-button']}>
          <Icon name={IconName.MAIN_LOGO} width="24" height="24" />
        </div>
      </NavLink>
      {sideBarItems.map((item: ISideBarItem) => (
        <NavLink key={item.itemName} to={item.routeName as AppRoute}>
          {({ isActive }): ReactNode => {
            return (
              <div
                className={cn(styles['button'], isActive && styles['active'])}
                data-tip={item.itemName}
                data-place="right"
              >
                <Icon name={item.itemName} width="24" height="24" />
              </div>
            );
          }}
        </NavLink>
      ))}
    </aside>
  );
};

export { StudioSidebar };
