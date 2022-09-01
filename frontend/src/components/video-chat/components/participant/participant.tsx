import { FC } from 'common/types/types';

type Props = {
  user: {
    id: string;
    username?: string;
  };
};

const Participant: FC<Props> = ({ user: { id } }) => (
  <div>
    <span>{id}</span>
  </div>
);

export { Participant };
