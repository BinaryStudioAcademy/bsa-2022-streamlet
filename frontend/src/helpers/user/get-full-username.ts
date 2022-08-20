import { joinExistingValues } from 'helpers/common/join-existing-values';

interface DisplayNameParams {
  username: string;
  firstName?: string;
  lastName?: string;
}

const getUserDisplayName = ({ firstName, lastName, username }: DisplayNameParams): string => {
  return joinExistingValues([firstName, lastName], ' ') || username;
};

export { getUserDisplayName };
