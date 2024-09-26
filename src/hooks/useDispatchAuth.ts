import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import constants from '~constants';
import { GetMeQuery } from '~services/user.services';
import { useAuthStore } from '~store';
import { getAccessToken } from '~utils/cookies';
import execute from '~utils/execute';

const WAIT_TEDDY_TIME = 2000;

const useDispatchAuth = () => {
  const idTimeOutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
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
      idTimeOutRef.current = setTimeout(() => {
        authenticate(data);
        // TODO: Not working as expected
        // if (!GUEST_URLS.includes(document.referrer)) navigate(-1);
      }, WAIT_TEDDY_TIME);
    }

    return () => {
      if (idTimeOutRef.current) {
        clearTimeout(idTimeOutRef.current);
      }
    };
  }, [data, authenticate, navigate]);
};

export default useDispatchAuth;
