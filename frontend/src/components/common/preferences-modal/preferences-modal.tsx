import { Modal } from '../modal/modal';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getCategories } from 'store/categories/actions';
import { UserBindCategoriesDto } from 'shared/build';
import clsx from 'clsx';
import { Icon } from '../icon';
import { IconName } from 'common/enums/enums';
import { pushOrDeleteIfExists } from 'helpers/helpers';

type PreferencesModalProps = {
  onSubmit: () => void;
  onClose: () => void;
  pickedCategories: Omit<UserBindCategoriesDto, 'id'>;
  setPickedCategories: (categories: Omit<UserBindCategoriesDto, 'id'>) => void;
  isOpen: boolean;
};

const PreferencesModal: FC<PreferencesModalProps> = ({
  onSubmit,
  onClose,
  isOpen,
  setPickedCategories,
  pickedCategories,
}) => {
  const { categories } = useAppSelector((state) => ({
    categories: state.category.data,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleClickCard = (id: string): void => {
    setPickedCategories({
      categories: pushOrDeleteIfExists<string>(id, pickedCategories.categories),
    });
  };

  const isPicked = (id: string): boolean =>
    Boolean(pickedCategories.categories.filter((category) => category === id).length);

  return (
    <Modal
      contentContainerClassName={styles['preferences-modal']}
      modalClassName={styles['all-screen']}
      isOpen={isOpen}
      onClose={onClose}
      isNeedHiddenOverflow={true}
    >
      <div className={styles['content-container']}>
        <div className={styles['content-heading']}>
          <div className={styles['content-header']}>What type of video do you prefer?</div>
          <div className={styles['content-subheader']}>Please, choose one or more categories</div>
        </div>
        <div className={styles['content-checklist']}>
          {categories.map(({ id, name, posterPath }) => (
            <div key={id} className={styles['card-container']} onClick={(): void => handleClickCard(id)}>
              <div className={clsx(styles['poster-container'], { [styles['picked']]: isPicked(id) })}>
                {posterPath ? <img src={posterPath} /> : <Icon name={IconName.MAIN_LOGO} />}
              </div>
              <div className={styles['name-container']}>{name}</div>
            </div>
          ))}
        </div>
        <div className={styles['button-container']}>
          <button
            disabled={!pickedCategories.categories.length}
            type="button"
            onClick={onSubmit}
            className={styles['button']}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { PreferencesModal };
