import { useNavigate } from 'react-router-dom';

import { Button } from '~components/ui/button';
import useAuth from '~hooks/useAuth';
import useDocumentTitle from '~hooks/useDocumentTitle';
import getDefaultHomePath from '~utils/getDefaultHomePath';

const NotFound = () => {
  useDocumentTitle('Stemy | Không tìm thấy trang');
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Không tìm thấy nội dung 😓</span>
        <p className='text-center text-muted-foreground'>
          URL của nội dung này đã bị thay đổi hoặc không còn tồn tại. <br />
          Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button onClick={() => navigate(getDefaultHomePath(user?.role))}>Về trang chủ</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
