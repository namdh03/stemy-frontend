import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import constants from '~constants';
import { GetMeQuery } from '~services/user.services';
import { useAuthStore } from '~store';
import { getAccessToken } from '~utils/cookies';
import execute from '~utils/execute';


const useDispatchAuth = () => {
  const { authenticate } = useAuthStore();

  // Query for get user info
  const { data } = useQuery({
    queryKey: [constants.USER_QUERY_KEY.GET_ME_QUERY_KEY],
    queryFn: () => execute(GetMeQuery),
    enabled: Boolean(getAccessToken()),
    select: (data) => data.data.me,
  });

  useEffect(() => {
    if (data) {
      authenticate(data);
    }
  }, [data, authenticate]);
};

export default useDispatchAuth;
