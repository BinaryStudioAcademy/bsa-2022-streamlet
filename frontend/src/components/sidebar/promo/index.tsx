import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Button } from '../../common/common';

type Props = {
  text: string;
  promoWrpClassName?: string;
  textSpanClassName?: string;
  btnTitle: string;
  btnType?: 'button' | 'submit';
  btnDisabled?: boolean;
  btnClassName?: string;
  btnOnClick?: () => void;
};

const Promo: FC<Props> = ({
  text,
  promoWrpClassName,
  textSpanClassName,
  btnTitle = 'button',
  btnClassName,
  btnDisabled,
  btnOnClick,
}) => {
  return (
    <div className={clsx(promoWrpClassName)}>
      <span className={clsx(textSpanClassName)}>{text}</span>
      <Button content={btnTitle} className={btnClassName} onClick={btnOnClick} disabled={btnDisabled} />
    </div>
  );
};

export { Promo };
