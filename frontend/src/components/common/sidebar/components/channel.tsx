import { DEFAULT_PICTURE } from 'common/constants/picture';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { Image } from '../../common';
import styles from './styles.module.scss';

type Props = {
  data: { id: string; name: string; image: string };
};

const Channel: FC<Props> = ({ data }) => {
  return (
    <li>
      <Link to={`${AppRoute.CHANNEL}/${data.id}`}>
        <Image
          className={styles.image}
          src={data.image.length > 0 ? data.image : DEFAULT_PICTURE}
          alt="channel image"
          isCircular={true}
        />
        <div className={styles.name}>{data.name}</div>
      </Link>
    </li>
  );
};

export { Channel };
