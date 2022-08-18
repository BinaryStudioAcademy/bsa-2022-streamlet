import { Comment } from 'shared/src/common/types/comment';

function getFullNameUserFromComment({ firstName, lastName, userName }: Comment): string {
  if (firstName || lastName) {
    return `${firstName || ''} ${lastName || ''}`;
  }

  return userName;
}

export { getFullNameUserFromComment };
