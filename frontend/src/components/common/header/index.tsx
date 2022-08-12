import { FC } from 'common/types/types';
import { Link } from 'react-router-dom';
import { useState, MouseEvent } from 'react';

import { AppRoute } from 'common/enums/enums';
import './header.scss';
import { SettingIcon } from 'components/icons/setting/setting';
import { MoonIcon } from 'components/icons/moon/moon';
import { LogoutIcon } from 'components/icons/logout/logout';

const Header: FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [menuOpen, setMenuStatus] = useState(false);

  function handleClickLogin(e: MouseEvent<HTMLButtonElement | Node>): void {
    e.preventDefault();

    setMenuStatus(false);
    setIsLogged(!isLogged);
  }

  function handleClickUserMenu(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    setMenuStatus(!menuOpen);
  }

  return (
    <header className="header">
      <div className="wrapper-first-part">
        <div className="logo-block">
          <button className="burger-menu">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.15625 22.9688H17.3438M5.15625 15.4688H21.0938M5.15625 7.96875H24.8438"
                stroke="#6A726D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link className="logo-link" to={AppRoute.ROOT}>
            <svg
              className="logo-icon"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.62603 11.6303L10.1995 20.2038C10.5578 20.5621 11.0354 20.7531 11.513 20.7531C11.9906 20.7531 12.4922 20.5621 12.8265 20.2038C13.5668 19.4635 13.5668 18.2933 12.8265 17.553L7.14268 11.8453C4.73064 9.43323 4.73064 5.49277 7.14268 3.08073C8.31288 1.88665 9.86518 1.24184 11.513 1.24184C13.1608 1.24184 14.737 1.88665 15.9072 3.05684L22.9762 10.1258V3.46283C22.9762 1.5523 21.4239 0 19.5133 0H3.53656C1.62603 0 0.0737305 1.5523 0.0737305 3.46283V11.0094C0.646889 10.9855 1.19617 11.2005 1.62603 11.6303Z"
                fill="#03D8FF"
              />
              <path
                d="M21.4237 14.6872L12.8502 6.11373C12.492 5.75551 12.0143 5.56445 11.5367 5.56445C11.0591 5.56445 10.5576 5.75551 10.2232 6.11373C9.48289 6.85406 9.48289 8.02426 10.2232 8.76459L15.9309 14.4723C18.2235 16.7649 18.343 20.4666 16.2414 22.8786H19.537C21.4476 22.8786 22.9999 21.3263 22.9999 19.4158V15.332C22.4028 15.332 21.8536 15.1171 21.4237 14.6872Z"
                fill="#06C149"
              />
              <path
                d="M0.0737305 16.1918V19.4397C0.0737305 21.3502 1.62603 22.9025 3.53656 22.9025H6.78446L0.0737305 16.1918Z"
                fill="#06C149"
              />
            </svg>
            <p className="main-name">streamlet</p>
          </Link>
        </div>
        <div className="block-search">
          <svg
            className="search-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L18.0319 16.6177Z"
              fill="#6A726D"
            />
          </svg>
          <input className="search-input" type="text" placeholder="Search or type" />
        </div>
      </div>
      <div className="block-user">
        {!isLogged && (
          <>
            <button className="search-mobile">
              <svg
                className="search-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L18.0319 16.6177Z"
                  fill="#6A726D"
                />
              </svg>
            </button>
            <button onClick={handleClickLogin} className="sign-in-btn">
              Sign In
            </button>
          </>
        )}
        {isLogged && (
          <div className="block-auth-user">
            <button className="search-mobile">
              <svg
                className="search-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L18.0319 16.6177Z"
                  fill="#6A726D"
                />
              </svg>
            </button>
            <button className="btn-go-stream">
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.95 18H13.2V13.05H18.15V10.8H13.2V5.85H10.95V10.8H6V13.05H10.95V18ZM2.25 24C1.65 24 1.125 23.775 0.675 23.325C0.225 22.875 0 22.35 0 21.75V2.25C0 1.65 0.225 1.125 0.675 0.675C1.125 0.225 1.65 0 2.25 0H21.75C22.35 0 22.875 0.225 23.325 0.675C23.775 1.125 24 1.65 24 2.25V10.3125L30 4.3125V19.6875L24 13.6875V21.75C24 22.35 23.775 22.875 23.325 23.325C22.875 23.775 22.35 24 21.75 24H2.25Z"
                  fill="#06C149"
                />
              </svg>
            </button>
            <button className="btn-notification">
              <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 10.5358C0 8.71809 0.381487 6.99579 1.14446 5.36886C1.90743 3.74194 2.99579 2.35624 4.40954 1.21178L5.78962 2.72651C4.60028 3.69144 3.67461 4.85274 3.01262 6.21038C2.35063 7.56802 2.01964 9.00982 2.01964 10.5358H0ZM21.9804 10.5358C21.9804 9.00982 21.6662 7.56802 21.0379 6.21038C20.4095 4.85274 19.5007 3.69144 18.3114 2.72651L19.6914 1.21178C21.0828 2.37868 22.1487 3.76999 22.8892 5.38569C23.6297 7.0014 24 8.71809 24 10.5358H21.9804ZM1.21178 22.8892V20.8696H4.03927V10.5694C4.03927 8.72931 4.59467 7.06311 5.70547 5.57083C6.81627 4.07854 8.28051 3.14166 10.0982 2.76017V1.78401C10.0982 1.26788 10.2833 0.841515 10.6536 0.504909C11.0238 0.168303 11.467 0 11.9832 0C12.4993 0 12.9425 0.168303 13.3128 0.504909C13.683 0.841515 13.8682 1.26788 13.8682 1.78401V2.76017C15.6858 3.14166 17.1557 4.07854 18.2777 5.57083C19.3997 7.06311 19.9607 8.72931 19.9607 10.5694V20.8696H22.7546V22.8892H1.21178ZM11.9832 26.9285C11.2651 26.9285 10.6367 26.6648 10.0982 26.1374C9.55961 25.6101 9.29032 24.9762 9.29032 24.2356H14.676C14.676 24.9762 14.4123 25.6101 13.885 26.1374C13.3576 26.6648 12.7237 26.9285 11.9832 26.9285Z"
                  fill="#6A726D"
                />
              </svg>
            </button>
            <button onClick={handleClickUserMenu} className="user-avatar"></button>
            {menuOpen && (
              <div className="user-menu">
                <ul className="option-list">
                  <li className="option">
                    <SettingIcon />
                    Settings
                  </li>
                  <li className="option">
                    <MoonIcon />
                    Theme
                  </li>
                  <li onClick={handleClickLogin} className="option">
                    <LogoutIcon />
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
