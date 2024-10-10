import { Badge } from '~components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~components/ui/dialog';
import { ScrollArea } from '~components/ui/scroll-area';
import { Separator } from '~components/ui/separator';
import { TicketStatus } from '~graphql/graphql';
import { useGetTicketById } from '~hooks/useGetTicketById';

interface ModalProps {
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
  ticketId: number;
}

const Modal = ({ open, onOpen, onClose, ticketId }: ModalProps) => {
  const formatDate = (date: string) => {
    return date ? new Date(date).toLocaleString() : '';
  };

  const { data: ticket } = useGetTicketById(ticketId);

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Open:
        return 'bg-green-500';
      case TicketStatus.Close:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
          {/* <DialogClose asChild>
            <button className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </button>
          </DialogClose> */}
        </DialogHeader>
        <ScrollArea className='max-h-[80vh] pr-4'>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold'>Title</h3>
              <p>{ticket?.title}</p>
            </div>
            <div>
              <h3 className='font-semibold'>Category</h3>
              <Badge variant='secondary'>{ticket?.category.name}</Badge>
            </div>
            <div>
              <h3 className='font-semibold'>Status</h3>
              <Badge className={getStatusColor(ticket?.status)}>{ticket?.status}</Badge>
            </div>
            <div>
              <h3 className='font-semibold'>Created At</h3>
              <p>{formatDate(ticket?.createdAt)}</p>
            </div>
            {ticket?.updatedAt && (
              <div>
                <h3 className='font-semibold'>Updated At</h3>
                <p>{formatDate(ticket.updatedAt)}</p>
              </div>
            )}
            {ticket?.closedAt && (
              <div>
                <h3 className='font-semibold'>Closed At</h3>
                <p>{formatDate(ticket.closedAt)}</p>
              </div>
            )}
            <Separator />
            <div>
              <h3 className='font-semibold'>Sender</h3>
              <p>
                {ticket?.sender?.fullName} ({ticket?.sender.email})
              </p>
            </div>
            <div>
              <h3 className='font-semibold'>Sender Comment</h3>
              <p className='whitespace-pre-wrap'>{ticket?.senderComment}</p>
            </div>
            <Separator />
            <div>
              <h3 className='font-semibold'>Product</h3>
              <p>{ticket?.orderItem.product.name}</p>
            </div>
            <div>
              <h3 className='font-semibold'>Order Item</h3>
              <p>ID: {ticket?.orderItem.order.id}</p>
            </div>
            {ticket?.replier && (
              <>
                <Separator />
                <div>
                  <h3 className='font-semibold'>Replier</h3>
                  <p>
                    {ticket.replier.fullName} ({ticket.replier.email})
                  </p>
                </div>
              </>
            )}
            {ticket?.replierComment && (
              <div>
                <h3 className='font-semibold'>Replier Comment</h3>
                <p className='whitespace-pre-wrap'>{ticket.replierComment}</p>
              </div>
            )}
            {ticket?.images?.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className='font-semibold'>Images</h3>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    {ticket?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.alt}
                        width={200}
                        height={200}
                        className='rounded-md object-cover'
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
