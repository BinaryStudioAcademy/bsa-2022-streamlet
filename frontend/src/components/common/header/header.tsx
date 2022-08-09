import { FC, SearchRequestDto } from 'common/types/types';
import { IconColor, IconName, AppRoute } from 'common/enums/enums';
import { Link, Button, SimpleInput, Icon, Image } from '../common';
import { useState, useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { searchHeader as searchHeaderValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SEARCH_PAYLOAD } from './common';
import { DEFAULT_PICTURE } from 'common/constants/picture';

import styles from './styles.module.scss';

type Props = {
  username: string;
  isActive: boolean;
};

const Header: FC<Props> = ({ username, isActive }) => {
  const { control, handleSubmit } = useAppForm<SearchRequestDto>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
    validationSchema: searchHeaderValidationSchema,
  });

  const handleSearchSubmit = (payload: SearchRequestDto): void => {
    //
    // eslint-disable-next-line no-console
    console.log('payload', payload, username, isActive);
  };
  const handleStream = (): void => {
    // eslint-disable-next-line no-console
    console.log('stream');
  };
  const handleNotification = (): void => {
    // eslint-disable-next-line no-console
    console.log('notification');
  };

  const [darkMode, setMode] = useState(1);
  const handleTheme = (): void => {
    const body = document.body;
    const addDarkMode = (): void => {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      setMode(1);
    };

    const addLightMode = (): void => {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      setMode(2);
    };
    !body.classList.contains('dark-mode') ? addDarkMode() : addLightMode();
  };

  const [userMenu, setState] = useState(false);
  const handleChangeUserMenuVisible = (): void => {
    setState(!userMenu);
  };

  return (
    <>
      <div className={styles.headerLogo}>
        <Link
          to={AppRoute.ROOT}
          children={
            <>
              <Icon name={IconName.LOGO} size="30" />
              <h4 className={styles.logoName}>STREAMLET</h4>
            </>
          }
        />
      </div>
      <div className={styles.headerSearch}>
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <label>
            <Button
              type="submit"
              label={
                <Icon color={darkMode === 1 ? IconColor.GRAY : IconColor.GREEN} name={IconName.SEARCH} size="20" />
              }
            />
            <SimpleInput
              type="text"
              placeholder="Search or type"
              name={getNameOf<SearchRequestDto>('search')}
              control={control}
            />
          </label>
        </form>
      </div>
      <div className={styles.headerInfo}>
        <Button label={<Icon color={IconColor.GREEN} name={IconName.CAMERA} size="30" />} onClick={handleStream} />
        <Button label={<Icon color={IconColor.GRAY} name={IconName.ALARM} size="25" />} onClick={handleNotification} />
        <Button
          label={<Icon color={IconColor.GRAY} name={darkMode === 1 ? IconName.SMILE : IconName.SMILE} size="25" />}
          onClick={handleTheme}
        />
        {isActive ? (
          <>
            <Link to={AppRoute.SIGN_IN} children="Sign in" />
            <Link to={AppRoute.SIGN_UP} children="Sign up" />
          </>
        ) : (
          <Button
            label={
              <Image
                className={styles.avatar}
                alt="asd"
                height="45px"
                width="45px"
                isCircular={true}
                src={DEFAULT_PICTURE}
              />
            }
            onClick={handleChangeUserMenuVisible}
          />
        )}
        {userMenu ? (
          <ul className={styles.userMenu}>
            <li>test</li>
            <li>test 2</li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export { Header };
