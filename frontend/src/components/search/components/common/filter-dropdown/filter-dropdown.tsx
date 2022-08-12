import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  filter: string;
  onChangeFilter: (value: string) => void;
  title: string;
  options: {
    text: string;
    value: string;
  }[];
};

const FilterDropdown: FC<Props> = ({ filter, onChangeFilter, title, options }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const onHandleToggleDropdown = (): void => setToggleDropdown(!toggleDropdown);
  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => onChangeFilter(e.currentTarget.value);

  return (
    <>
      <div className={styles['filter-dropdown']}>
        <div className={styles['filter-dropdown-title']} onClick={onHandleToggleDropdown}>
          {title}
          <Icon name={toggleDropdown ? IconName.ARROW_UP : IconName.ARROW_DOWN} color="gray" />
        </div>
        {toggleDropdown ? (
          <ul className={styles['filter-dropdown-list']}>
            {options.map((o) => (
              <li key={o.value} className={styles['filter-dropdown-item']}>
                <input
                  id={`rad-${o.value}`}
                  type="radio"
                  name={title}
                  value={o.value}
                  checked={filter === o.value}
                  onChange={onHandleChangeFilter}
                />
                <label htmlFor={`rad-${o.value}`}>{o.text}</label>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export { FilterDropdown };
