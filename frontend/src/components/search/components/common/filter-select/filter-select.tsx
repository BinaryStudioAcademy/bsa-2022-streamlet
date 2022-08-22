import { FC } from 'common/types/types';
import { useId, useEffect } from 'hooks/hooks';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';
import { IconName } from 'common/enums/component/component';

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
  const id = useId();
  const filterTitleId = useId();

  const onHandleChangeFilter = (e: React.FormEvent<HTMLInputElement>): void => onChangeFilterId(e.currentTarget.value);

  const handleClearFilter = (): void => onChangeFilterId(defaultFilterId);

  const onHandleFocusFilter = (): void => onChangeToggleAllFilters(true);

  useEffect(() => {
    if (!toggleAllFilters) {
      const filterSelectTitle = document.getElementById(filterTitleId);
      filterSelectTitle?.blur();
    }
    // eslint-disable-next-line
  }, [toggleAllFilters]);

  return (
    <div className={styles.container}>
      <div className={styles['filter-select']}>
        <div className={styles['filter-select-title']} tabIndex={13} id={filterTitleId} onFocus={onHandleFocusFilter}>
          <span>{title}</span>
          <Icon name={IconName.ARROW_DOWN} />
        </div>
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
      </div>
    </div>
  );
};

export { FilterSelect };
