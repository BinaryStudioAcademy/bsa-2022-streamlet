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

const FilterSelect: FC<Props> = ({ filter, onChangeFilter, title, options }) => {
  const [filterTitle, setFilterTitle] = useState(title);

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => {
    onChangeFilter(e.currentTarget.value);
    setFilterTitle(e.currentTarget.dataset.name as string);
  };

  return (
    <div className={styles['filter-select']}>
      <div className={styles['filter-select-title']} tabIndex={13}>
        {filterTitle}
        <Icon name={IconName.ARROW_DOWN} />
      </div>
      <div className={styles['filter-select-list']}>
        {options.map((o) => {
          const id = `radS-${o.value}`;
          return (
            <div key={o.value} className={styles['filter-select-item']}>
              <input
                id={id}
                type="radio"
                name={title}
                value={o.value}
                data-name={o.text}
                checked={filter === o.value}
                onChange={onHandleChangeFilter}
              />
              <label htmlFor={id}>{o.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { FilterSelect };
