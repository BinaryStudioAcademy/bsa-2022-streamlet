import { RefreshToken } from '@prisma/client';
import { users } from '.';

export const refreshTokens: Omit<RefreshToken, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    userId: users[0].id,
    'token': '15onkjKS1x8KijwBDK4rE6KR14h1UuaEWS',
  },
  {
    userId: users[1].id,
    'token': '143GtHcLQxasf7mZKDXYW5cD3zTdeWpEJq',
  },
  {
    userId: users[4].id,
    'token': '1EHkoexhaCipYJTybjYkuv84wbTbLdQSq9',
  },
  {
    userId: users[8].id,
    'token': '1G8nasix5jXdmT9364hxmq2KLqPw5pfADp',
  },
  {
    userId: users[15].id,
    'token': '12HERvv6Sip736cNWBqTnNtmxJZYjmij8P',
  },
  {
    userId: users[16].id,
    'token': '17khmCbNkLHbrFb4KxFBh5WbFYwcoPHAch',
  },
  {
    userId: users[45].id,
    'token': '1FW1TpvQdTZocvoFmUNdbJdSHK8tatqF8r',
  },
  {
    userId: users[48].id,
    'token': '1Cj28Dh9M1Lj8iKJBJ6xfi3EW7MrJ6Wojf',
  },
  {
    userId: users[52].id,
    'token': '1DiV6MVYekhHopZ6aKsXJ8FUXXmRyYJfiy',
  },
  {
    userId: users[98].id,
    'token': '1BFTcLBTQNBjvF1NohZRtx3M5sKBPddKtH',
  },
];
