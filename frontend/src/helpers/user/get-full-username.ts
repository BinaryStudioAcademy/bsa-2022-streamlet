import { joinExistingValues } from 'helpers/common/join-existing-values';

interface DisplayNameParams {
  userName: string;
  firstName?: string;
  lastName?: string;
}

const getUserDisplayName = ({ firstName, lastName, userName }: DisplayNameParams): string => {
  return joinExistingValues([firstName, lastName], ' ') || userName;
};

export { getUserDisplayName };
