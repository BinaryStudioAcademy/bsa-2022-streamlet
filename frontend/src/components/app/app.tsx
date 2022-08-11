import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, ConfirmationModal } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { NotFound } from '../not-found-page/not-found';
import { ReactElement, useState } from 'react';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.ROOT} element="Root" />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.RESTORE_PASSWORD} element={<Auth />} />
        <Route path={AppRoute.ANY} element={<NotFound />} />
        <Route
          path={'test/confirmationModal/'}
          element={((): ReactElement => {
            const [isNeedModal, setIsNeedModal] = useState(false);
            const [modalText, setModalText] = useState('');
            return (
              <div style={{ height: '10000000000px' }}>
                <label htmlFor="config-modal-text" style={{ color: 'black' }}>
                  {' '}
                  Enter modal text
                </label>
                <input
                  type="text"
                  onChange={(e): void => {
                    setModalText(e.target.value);
                  }}
                ></input>
                <button
                  onClick={(): void => {
                    setIsNeedModal(true);
                  }}
                >
                  show modal
                </button>
                <ConfirmationModal
                  isOpen={isNeedModal}
                  confirmationText={modalText}
                  onCancel={(): void => setIsNeedModal(!isNeedModal)}
                  onOk={(): void => setIsNeedModal(!isNeedModal)}
                />
              </div>
            );
          })()}
        />
      </Routes>
    </>
  );
};

export { App };
