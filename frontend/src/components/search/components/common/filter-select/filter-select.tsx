import React from 'react';
import { FC } from 'common/types/types';
import { useId, useEffect, useState } from 'hooks/hooks';
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

const FilterSelect: FC<Props> = ({
  activeFilterId,
  onChangeFilterId,
  defaultFilterId,
  title,
  options,
  toggleAllFilters,
  onChangeToggleAllFilters,
}) => {
  const [toggleSelect, setToggleSelect] = useState(false);

  const id = useId();

  const handleToggleSelect = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    const toggle = !toggleSelect;
    setToggleSelect(toggle);
    if (toggle) {
      onChangeToggleAllFilters(toggle);
    }
  };

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => {
    onChangeFilterId(e.currentTarget.value);
    setTimeout(setToggleSelect, 0, false);
  };

  const handleClearFilter = (): void => onChangeFilterId(defaultFilterId);

  useEffect(() => {
    if (!toggleAllFilters) {
      setToggleSelect(false);
    }
  }, [toggleAllFilters]);

  return (
    <div className={styles.container}>
      <div className={styles['filter-select']}>
        <div className={styles['filter-select-title']} onClick={handleToggleSelect}>
          <span>{title}</span>
          <Icon name={toggleSelect ? IconName.ARROW_UP : IconName.ARROW_DOWN} />
        </div>
        {toggleSelect && (
          <div className={styles['filter-select-list']}>
            {options.map((o) => {
              const optionId = `${id}-${o.id}`;
              return (
                <div key={optionId} className={styles['filter-select-item']}>
                  <input
                    id={optionId}
                    type="radio"
                    name={title}
                    value={o.id}
                    checked={activeFilterId === o.id}
                    onChange={onHandleChangeFilter}
                  />
                  <label htmlFor={optionId}>{o.text}</label>
                  <div className={styles['filter-select-item-close-icon']} onClick={handleClearFilter}>
                    <Icon name={IconName.X_MARK} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { FilterSelect };
