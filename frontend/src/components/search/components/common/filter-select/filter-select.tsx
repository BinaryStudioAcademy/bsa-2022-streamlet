import { FC } from 'common/types/types';
import { useId, useState } from 'hooks/hooks';
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

const FilterSelect: FC<Props> = ({ activeFilterId, onChangeFilterId, title, options }) => {
  const [filterTitle, setFilterTitle] = useState(title);

  const id = useId();

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => {
    onChangeFilterId(e.currentTarget.value);
    setFilterTitle(e.currentTarget.dataset.name as string);
  };

  return (
    <div className={styles.container}>
      <div className={styles['filter-select']}>
        <div className={styles['filter-select-title']} tabIndex={13}>
          <span>{filterTitle}</span>
          <Icon name={IconName.ARROW_DOWN} />
        </div>
        <div className={styles['filter-select-list']}>
          {options.map((o) => {
            const optionId = `${id}-${o.value}`;
            return (
              <div key={optionId} className={styles['filter-select-item']}>
                <input
                  id={optionId}
                  type="radio"
                  name={title}
                  value={o.value}
                  data-name={o.text}
                  checked={activeFilterId === o.value}
                  onChange={onHandleChangeFilter}
                />
                <label htmlFor={optionId}>{o.text}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { FilterSelect };
