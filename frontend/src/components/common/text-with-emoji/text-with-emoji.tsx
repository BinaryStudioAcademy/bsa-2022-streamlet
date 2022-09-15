import { EmojiStyle } from 'emoji-picker-react';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { useId } from 'hooks/hooks';
import { getEmojiCdnUrl } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  text: string;
  emojiStyle?: EmojiStyle;
  emojiClassname?: string;
  textClassName?: string;
};

const TextWithEmoji: FC<Props> = ({ text, emojiStyle, emojiClassname, textClassName }) => {
  const textId = useId();

  const emojiReg = /\p{Emoji}(\u200d\p{Emoji})*/gu;

  const textParts = text.split(emojiReg);
  const emojiParts = text.match(emojiReg)?.map((e) => (e.length === 1 ? e : e.codePointAt(0)?.toString(16)));

  let index = 0;

  return (
    <p className={clsx(styles['text-with-emoji'], textClassName)}>
      {textParts.map((tp, i) => {
        if (typeof tp === 'undefined' && emojiParts && emojiParts[index]) {
          if (emojiParts[index]?.length === 1) {
            return <span key={`${textId}-n-${index}`}>{emojiParts[index++]}</span>;
          }
          return (
            <img
              key={`${textId}-e-${index}`}
              src={`${getEmojiCdnUrl(emojiStyle)}${emojiParts[index]}.png`}
              alt={String.fromCodePoint(Number(`0x${emojiParts[index++]}`))}
              className={clsx(styles['emoji'], emojiClassname)}
            />
          );
        }
        if (tp !== '') {
          return <span key={`${textId}-t-${i}`}>{tp}</span>;
        }
        return null;
      })}
    </p>
  );
};

export { TextWithEmoji };
