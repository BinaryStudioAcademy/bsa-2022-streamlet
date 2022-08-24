import { FC } from 'common/types/types';
import { useId } from 'hooks/hooks';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  activeFilterId: string;
  onChangeFilterId: (value: string) => void;
  options: {
    id: string;
    text: string;
  }[];
};

const FilterBarSelect: FC<Props> = ({ activeFilterId, onChangeFilterId, options }) => {
  const selectId = useId();
  const optionId = useId();

  const onHandleChangeFilter = (e: React.FormEvent<HTMLSelectElement>): void => onChangeFilterId(e.currentTarget.value);

  return (
    <div className={styles.container}>
      <div className={styles['filter-bar-select']}>
        <label htmlFor={selectId} className={styles['filter-bar-select-label']}>
          <select id={selectId} onChange={onHandleChangeFilter} value={activeFilterId}>
            {options.map((o) => (
              <option key={`${optionId}-${o.id}`} value={o.id}>
                {o.text}
              </option>
            ))}
          </select>
          <Icon name={IconName.ARROW_DOWN} />
        </label>
      </div>
    </div>
  );
};

export { FilterBarSelect };
