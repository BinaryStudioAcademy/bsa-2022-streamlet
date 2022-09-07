import { Modal } from '../modal/modal';
import { FC, useEffect } from 'react';
import style from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getCategories } from 'store/categories/actions';
import { CategoryBlock } from './common/category-block';

type PreferencesModalProps = {
  onSubmit: () => void;
  onClose: () => void;
  isOpen: boolean;
};

const PreferencesModal: FC<PreferencesModalProps> = ({ onSubmit, onClose, isOpen }) => {
  const { categories, isSomePreferencesPicked } = useAppSelector((state) => ({
    categories: state.category.data,
    isSomePreferencesPicked: state.preference.data.length,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={style['content-container']}>
        <div className={style['content-heading']}>
          <div className={style['content-header']}>What type of video do you prefer?</div>
          <div className={style['content-subheader']}>Please, choose one or more categories</div>
        </div>
        <CategoryBlock categories={categories} />
        <div className={style['button-container']}>
          <button disabled={!isSomePreferencesPicked} type="button" onClick={onSubmit} className={style['button']}>
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { PreferencesModal };
