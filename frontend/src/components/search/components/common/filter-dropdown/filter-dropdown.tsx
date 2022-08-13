import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  activeFilterId: string;
  onChangeFilterId: (value: string) => void;
  title: string;
  options: {
    text: string;
    value: string;
  }[];
};

const FilterDropdown: FC<Props> = ({ activeFilterId, onChangeFilterId, title, options }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggleDropdown = (): void => setToggleDropdown(!toggleDropdown);

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => onChangeFilterId(e.currentTarget.value);

  return (
    <div>
      <div className={styles['filter-dropdown']}>
        <div className={styles['filter-dropdown-title']} onClick={handleToggleDropdown}>
          <span>{title}</span>
          <Icon name={toggleDropdown ? IconName.ARROW_UP : IconName.ARROW_DOWN} />
        </div>
        {toggleDropdown && (
          <ul className={styles['filter-dropdown-list']}>
            {options.map((o) => {
              const id = `rad-${o.value}`;
              return (
                <li key={o.value} className={styles['filter-dropdown-item']}>
                  <input
                    id={id}
                    type="radio"
                    name={title}
                    value={o.value}
                    checked={activeFilterId === o.value}
                    onChange={onHandleChangeFilter}
                  />
                  <label htmlFor={id}>{o.text}</label>
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
