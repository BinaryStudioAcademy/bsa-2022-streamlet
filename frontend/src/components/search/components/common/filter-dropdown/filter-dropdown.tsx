import { FC } from 'common/types/types';
import { useId, useState, useEffect } from 'hooks/hooks';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  activeFilterId: string;
  onChangeFilterId: (value: string) => void;
  defaultFilterId: string;
  title: string;
  options: {
    text: string;
    value: string;
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

  const handleToggleDropdown = (): void => {
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
      <div className={styles['filter-dropdown']}>
        <div className={styles['filter-dropdown-title']} onClick={handleToggleDropdown}>
          <span>{title}</span>
          <Icon name={toggleDropdown ? IconName.ARROW_UP : IconName.ARROW_DOWN} />
        </div>
        {toggleDropdown && (
          <ul className={styles['filter-dropdown-list']}>
            {options.map((o) => {
              const optionId = `${id}-${o.value}`;
              return (
                <li key={optionId} className={styles['filter-dropdown-item']}>
                  <input
                    id={optionId}
                    type="radio"
                    name={title}
                    value={o.value}
                    checked={activeFilterId === o.value}
                    onChange={onHandleChangeFilter}
                  />
                  <label htmlFor={optionId}>{o.text}</label>
                  <div className={styles['filter-dropdown-item-close-icon']} onClick={handleClearFilter}>
                    <Icon name={IconName.XMARK} />
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
