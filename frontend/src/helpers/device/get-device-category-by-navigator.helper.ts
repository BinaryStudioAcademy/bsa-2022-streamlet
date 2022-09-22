import { VideoDeviceCategory } from 'common/enums/enums';

const getDeviceCategoryByNavigator = (navigator: Navigator): VideoDeviceCategory => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return VideoDeviceCategory.TABLET;
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return VideoDeviceCategory.MOBILE;
  }
  return VideoDeviceCategory.DESKTOP;
};

export { getDeviceCategoryByNavigator };
