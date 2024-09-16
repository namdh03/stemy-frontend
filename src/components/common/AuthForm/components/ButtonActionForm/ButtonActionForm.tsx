import { memo } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '~components/common/Spinner';
import { Button } from '~components/ui/button';

interface ButtonActionFormProps {
  mainTitle: string;
  subTitle: string;
  to: string;
  loading?: boolean;
}

const ButtonActionForm = memo(({ mainTitle, subTitle, to, loading = false }: ButtonActionFormProps) => {
  return (
    <div className='relative top-7 flex justify-center'>
      <div className='w-96'>
        <Button type='submit' size={'lg'} className='w-48 text-base' disabled={loading}>
          {loading ? (
            <>
              <Spinner className='me-2' />
              Loading...
            </>
          ) : (
            mainTitle
          )}
        </Button>
        <Button type='button' variant={'link'} size={'lg'} className='text-zinc-500 text-sm'>
          <Link to={to}>{subTitle}</Link>
        </Button>
      </div>
    </div>
  );
});

export default ButtonActionForm;
