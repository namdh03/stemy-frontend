import { Link } from 'react-router-dom';

import icons from '~assets/icons';
import configs from '~configs';

const Logo = ({ to = configs.routes.home }: { to?: string }) => {
  return (
    <Link to={to} className='inline-flex gap-[10px] flex-shrink-0'>
      <img src={icons.logo} alt='Stemy' className='h-full' />
      <span className='font-roboto text-secondary text-[32px]'>Stemy</span>
    </Link>
  );
};

export default Logo;
