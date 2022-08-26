import React from 'react';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { useId, useState, useEffect } from 'hooks/hooks';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  activeFilterId: string;
  onChangeFilterId: (value: string) => void;
  defaultFilterId: string;
  title: string;
  options: {
    id: string;
    text: string;
  }[];
  toggleAllFilters: boolean;
  onChangeToggleAllFilters: (toggle: boolean) => void;
};

const FilterDropdown: FC<Props> = ({
  activeFilterId,
  onChangeFilterId,
  defaultFilterId,
  title,
  options,
  toggleAllFilters,
  onChangeToggleAllFilters,
}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const id = useId();

  const handleToggleDropdown = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    const toggle = !toggleDropdown;
    setToggleDropdown(toggle);
    if (toggle) {
      onChangeToggleAllFilters(toggle);
    }
  };

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => onChangeFilterId(e.currentTarget.value);

  const handleClearFilter = (): void => onChangeFilterId(defaultFilterId);

  useEffect(() => {
    if (!toggleAllFilters) {
      setToggleDropdown(false);
    }
  }, [toggleAllFilters]);

  return (
    <div className={styles.container}>
      <div className={clsx(styles['filter-dropdown'], toggleDropdown && styles['filter-is-open'])}>
        <div className={styles['filter-dropdown-title']} onClick={handleToggleDropdown}>
          <span>{title}</span>
          <Icon name={toggleDropdown ? IconName.ARROW_UP : IconName.ARROW_DOWN} />
        </div>
        {toggleDropdown && (
          <ul className={styles['filter-dropdown-list']}>
            {options.map((o) => {
              const optionId = `${id}-${o.id}`;
              return (
                <li key={optionId} className={styles['filter-dropdown-item']}>
                  <input
                    id={optionId}
                    type="radio"
                    name={title}
                    value={o.id}
                    checked={activeFilterId === o.id}
                    onChange={onHandleChangeFilter}
                  />
                  <label htmlFor={optionId}>{o.text}</label>
                  <div className={styles['filter-dropdown-item-close-icon']} onClick={handleClearFilter}>
                    <Icon name={IconName.X_MARK} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export { FilterDropdown };
