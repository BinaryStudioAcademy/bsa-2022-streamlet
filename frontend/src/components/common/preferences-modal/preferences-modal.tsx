import { Modal } from '../modal/modal';
import { FC, useEffect } from 'react';
import style from './styles.module.scss';
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

  const isPicked = (id: string): boolean => !!pickedCategories.categories.filter((category) => category === id).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={style['content-container']}>
        <div className={style['content-heading']}>
          <div className={style['content-header']}>What type of video do you prefer?</div>
          <div className={style['content-subheader']}>Please, choose one or more categories</div>
        </div>
        <div className={style['content-checklist']}>
          {categories.map(({ id, name, posterPath }) => (
            <div key={id} className={style['card-container']} onClick={(): void => handleClickCard(id)}>
              <div className={clsx(style['poster-container'], { [style['picked']]: isPicked(id) })}>
                {posterPath ? <img src={posterPath} /> : <Icon name={IconName.MAIN_LOGO} />}
              </div>
              <div className={style['name-container']}>{name}</div>
            </div>
          ))}
        </div>
        <div className={style['button-container']}>
          <button
            disabled={!pickedCategories.categories.length}
            type="button"
            onClick={onSubmit}
            className={style['button']}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { PreferencesModal };
