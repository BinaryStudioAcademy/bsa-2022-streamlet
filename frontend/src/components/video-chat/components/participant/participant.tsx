import { FC, ProfileUpdateResponseDto } from 'common/types/types';
import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import { useCallback, useEffect, useState } from 'hooks/hooks';
import { profileApi } from 'services/services';

import styles from './styles.module.scss';

type Props = {
  id: string;
};

const Participant: FC<Props> = ({ id }) => {
  const [participant, setParticipant] = useState({} as ProfileUpdateResponseDto);

  const getUserInfo = useCallback((): void => {
    profileApi
      .getProfileByUserId({ userId: id })
      .then((info) => {
        setParticipant(info);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    getUserInfo();
  }, [id, getUserInfo]);

  if (!participant.userId) {
    return null;
  }

  return (
    <div className={styles['participant']}>
      {participant.avatar ? (
        <img className={styles['participant-avatar']} src={participant.avatar} alt={participant.username} />
      ) : (
        <div className={styles['default-avatar']}>
          {generateAbbreviatureNameUser(getUserDisplayName({ userName: participant.username }))}
        </div>
      )}
      <p className={styles['participant-name']}>{getUserDisplayName({ userName: participant.username })}</p>
    </div>
  );
};

export { Participant };
