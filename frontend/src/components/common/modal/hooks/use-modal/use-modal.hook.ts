import { MouseEventHandler, useCallback } from 'react';

type UseModalPropsType = {
  onClose: () => void;
};

type UseModalReturn = {
  handleOutsideClick: MouseEventHandler<HTMLDivElement>;
  handleDisableContentContainerClick: MouseEventHandler<HTMLDivElement>;
};

const useModal = ({ onClose }: UseModalPropsType): UseModalReturn => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const onDisableContent: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation();
  };
  const handleDisableContentContainerClick = useCallback(onDisableContent, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick,
  };
};

export { useModal };
