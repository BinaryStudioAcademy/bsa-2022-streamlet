// import { NOTIFICATION_REQUEST_SIZE } from 'common/constants/constants';
import { FC } from 'common/types/types';
import { /* useAppDispatch, useEffect, */ useAppSelector, useCallback, useOutsideClick } from 'hooks/hooks';
import { MouseEvent } from 'react';
// import { notificationActions } from 'store/actions';
import { NotificationDropdown } from './notification-dropdown';

const NotificationDropdownContainer: FC = () => {
  // const dispatch = useAppDispatch();
  const { dataStatus, notifications, total, loaded } = useAppSelector((state) => ({
    dataStatus: state.notification.dataStatus,
    error: state.notification.error,
    notifications: state.notification.notifications,
    total: state.notification.total,
    loaded: state.notification.loaded,
  }));

  const {
    isOpened: isDropdownOpen,
    close: closeDropdown,
    open: openDropdown,
    ref: dropdownRef,
  } = useOutsideClick<HTMLDivElement>();

  function handleClickDropdown(e: MouseEvent<HTMLButtonElement>): void {
    if (!isDropdownOpen) {
      e.preventDefault();
      openDropdown();
    }
  }

  function handleCloseDropdown(): void {
    closeDropdown();
  }

  const handleLoadNotifications = useCallback(
    // () =>
    //   dispatch(
    //     notificationActions.getNotifications({
    //       from: loaded,
    //       count: NOTIFICATION_REQUEST_SIZE,
    //     }),
    //   ),
    // [dispatch, loaded],
    () => null,
    [],
  );

  const handleReadAllNotifications = useCallback(
    // () => dispatch(notificationActions.readAllNotifications()),
    // [dispatch],
    () => null,
    [],
  );

  const handleReadNotification = useCallback(
    // (id: string) => {
    //   dispatch(notificationActions.readNotification({ id }));
    //   if (loaded < total) {
    //     dispatch(
    //       notificationActions.getNotifications({
    //         from: 0,
    //         count: loaded + 1,
    //       }),
    //     );
    //   }
    // },
    // [dispatch, loaded, total],
    () => null,
    [],
  );

  // Will be used when backend part is configured
  // useEffect(() => {
  //   handleLoadNotifications();
  // }, [handleLoadNotifications]);

  return (
    <NotificationDropdown
      dropdownRef={dropdownRef}
      isDropdownOpen={isDropdownOpen}
      onClickDropdown={handleClickDropdown}
      onCloseDropdown={handleCloseDropdown}
      notifications={notifications}
      dataStatus={dataStatus}
      total={total}
      loaded={loaded}
      onLoadNotifications={handleLoadNotifications}
      onReadNotification={handleReadNotification}
      onReadAllNotifications={handleReadAllNotifications}
    />
  );
};

export { NotificationDropdownContainer };
