import { Button } from '~components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/dialog';

interface ModalProps {
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}

const Modal = ({ open, onOpen, onClose }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className='max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='mb-3'>Thông tin chi tiết công thức</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
