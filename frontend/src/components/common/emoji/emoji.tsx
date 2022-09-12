import EmojiPicker, { Theme, EmojiClickData, Props as EmojiPickerProps } from 'emoji-picker-react';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useState, useEffect, useRef, useCallback } from 'hooks/hooks';
import { Icon } from 'components/common/icon';
import { defaultEmojiPickerConfig } from './config';

import styles from './styles.module.scss';

type Props = {
  isLightTheme: boolean;
  isHide?: boolean;
  onClickEmojiBtn?: () => void;
  setSelectedEmoji: (emoji: EmojiClickData) => void;
  emojiChooseBtnClassName?: string;
  emojiBlockClassName?: string;
  emojiPickerConfig?: EmojiPickerProps;
};

const Emoji: FC<Props> = ({
  isLightTheme,
  isHide,
  onClickEmojiBtn,
  setSelectedEmoji,
  emojiChooseBtnClassName,
  emojiBlockClassName,
  emojiPickerConfig = defaultEmojiPickerConfig,
}) => {
  const [showEmojiBlock, setShowEmojiBlock] = useState(false);

  const emojiBlockEl = useRef<HTMLDivElement>(null);
  const emojiBtnEl = useRef<HTMLButtonElement>(null);

  const handleSetShowEmojiBlock = (): void => setShowEmojiBlock(!showEmojiBlock);

  const handleClickEmojiBtn = (): void => {
    handleSetShowEmojiBlock();
    if (onClickEmojiBtn) {
      onClickEmojiBtn();
    }
  };

  const onClickEmoji = (emoji: EmojiClickData): void => {
    setSelectedEmoji(emoji);
  };

  const onHandleClickOutside = useCallback((e: MouseEvent): void => {
    if (
      !emojiBlockEl.current?.contains(e.target as HTMLElement) &&
      !emojiBtnEl.current?.contains(e.target as HTMLElement)
    ) {
      setShowEmojiBlock(false);
    }
  }, []);

  const addTypesToButtons = (): void => {
    if (emojiBlockEl.current) {
      const emojiButtons = emojiBlockEl.current.querySelectorAll('button:not([type])');
      for (const button of emojiButtons) {
        button.setAttribute('type', 'button');
      }
    }
  };

  const onHandleChangeEmojiSearch = useCallback((): void => {
    addTypesToButtons();
  }, []);

  useEffect(() => {
    const searchEl = emojiBlockEl.current?.querySelector('input.epr-search') as HTMLInputElement | null;
    if (emojiBlockEl.current) {
      addTypesToButtons();

      // have to add it due to emojiSearchClearBtn does't have type='button'
      // and submits form onClick
      if (searchEl) {
        searchEl.addEventListener('change', onHandleChangeEmojiSearch);
      }
    }

    return () => {
      if (searchEl) {
        searchEl.removeEventListener('change', onHandleChangeEmojiSearch);
      }
    };
  }, [onHandleChangeEmojiSearch]);

  useEffect(() => {
    if (showEmojiBlock) {
      window.addEventListener('click', onHandleClickOutside);
    }
    return () => {
      window.removeEventListener('click', onHandleClickOutside);
    };
  }, [showEmojiBlock, onHandleClickOutside]);

  useEffect(() => {
    if (isHide) {
      setShowEmojiBlock(false);
    }
  }, [isHide]);

  return (
    <div className={styles['emoji-picker']}>
      <button
        onClick={handleClickEmojiBtn}
        ref={emojiBtnEl}
        className={clsx(styles['choose-emoji-btn'], emojiChooseBtnClassName)}
        type="button"
      >
        <Icon name={IconName.SMILE_2} width="25" height="25" />
      </button>
      <div
        style={{ display: showEmojiBlock ? 'block' : 'none' }}
        className={clsx(styles['emoji-block'], emojiBlockClassName)}
        ref={emojiBlockEl}
      >
        <EmojiPicker
          {...emojiPickerConfig}
          onEmojiClick={onClickEmoji}
          theme={isLightTheme ? Theme.LIGHT : Theme.DARK}
        />
      </div>
    </div>
  );
};

export { Emoji };
