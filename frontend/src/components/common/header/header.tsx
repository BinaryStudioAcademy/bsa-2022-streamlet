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
  isActive: boolean;
};

const Header: FC<Props> = ({ isActive }) => {
  const { control, handleSubmit } = useAppForm<SearchRequestDto>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
    validationSchema: searchHeaderValidationSchema,
  });

  const handleSearchSubmit = (payload: SearchRequestDto): void => {
    //
    // eslint-disable-next-line no-console
    console.log('payload', payload);
  };

  const handleNotification = (): void => {
    // eslint-disable-next-line no-console
    console.log('notification');
  };

  const [darkMode, setMode] = useState(true);
  const handleTheme = (): void => {
    const body = document.body;
    const addDarkMode = (): void => {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      setMode(true);
    };

    const addLightMode = (): void => {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      setMode(false);
    };
    !body.classList.contains('dark-mode') ? addDarkMode() : addLightMode();
  };

  const [userMenu, setState] = useState(false);
  const handleChangeUserMenuVisible = (): void => {
    setState(!userMenu);
  };

  const navVisible = (): boolean => {
    if (!isActive) {
      if (userMenu) {
        setState(false);
      }
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={styles.headerlogo}>
        <Link
          to={AppRoute.ROOT}
          children={
            <>
              <Icon name={IconName.LOGO} size="30" />
              <h4 className={styles.logoname}>STREAMLET</h4>
            </>
          }
        />
      </div>
      <div className={styles.headersearch}>
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <Button
            type="submit"
            label={<Icon color={darkMode ? IconColor.GRAY : IconColor.GREEN} name={IconName.SEARCH} size="20" />}
          />
          <SimpleInput
            type="text"
            placeholder="Search or type"
            name={getNameOf<SearchRequestDto>('search')}
            control={control}
          />
        </form>
      </div>
      <div className={styles.headerinfo}>
        {!navVisible() ? (
          <>
            <Link to={AppRoute.SIGN_IN} children="Sign in" />
            <Link to={AppRoute.SIGN_UP} children="Sign up" />
          </>
        ) : (
          <>
            <div>
              <Link to={AppRoute.STREAM} children={<Icon color={IconColor.GREEN} name={IconName.CAMERA} size="30" />} />
            </div>
            <Button
              label={<Icon color={IconColor.GRAY} name={IconName.ALARM} size="25" />}
              onClick={handleNotification}
            />
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
            {userMenu ? (
              <ul className={styles.usermenu}>
                <li>
                  <Icon color={IconColor.GRAY} name={IconName.GEAR} size="25" />
                  <h5>Settings</h5>
                </li>
                <li>
                  <Icon color={IconColor.GRAY} name={IconName.GLOB} size="25" />
                  <h5>Language</h5>
                </li>
                <li>
                  <Icon color={IconColor.GRAY} name={darkMode ? IconName.MOON : IconName.MOON} size="25" />
                  <h5>Dark mode</h5>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={darkMode} onChange={handleTheme} />
                    <span className={styles.slider}></span>
                  </label>
                </li>
                <li>
                  <Icon color={IconColor.GRAY} name={IconName.LOGOUT} size="25" />
                  <h5>Log out</h5>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { Header };
