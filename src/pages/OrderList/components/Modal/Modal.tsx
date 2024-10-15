import { Clock, CreditCard, MapPin, Package, ShoppingBag, Truck, User } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useGetOrderById } from '~hooks/useGetOrderById';

export default function OrderDetailModal({
  orderId,
  isOpen,
  onClose,
}: {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: order, isLoading } = useGetOrderById(orderId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[625px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Order Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className='max-h-[80vh] pr-4'>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <Package className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Order ID:</span>
                <span>{order!.id}</span>
              </div>
              <Badge className={`${getStatusColor(order!.status)} px-2 py-1 rounded-full text-xs font-semibold`}>
                {order!.status}
              </Badge>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <User className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Customer:</span>
                <span>{order!.fullName}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Address:</span>
                <span>{order!.address}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <ShoppingBag className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Phone:</span>
                <span>{order!.phone}</span>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <Clock className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Order Created:</span>
                <span>{formatDate(order!.createdAt)}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Truck className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Ship Time:</span>
                <span>{formatDate(order!.shipTime)}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Package className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Receive Time:</span>
                <span>{formatDate(order!.receiveTime)}</span>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Order Items:</h3>
              <ul className='space-y-2'>
                {order!.orderItems.map((item) => (
                  <li key={item.id} className='bg-gray-50 p-2 rounded-md'>
                    <div className='flex justify-between'>
                      <span>{item.product.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Price: ${item.productPrice.toFixed(2)}</span>
                      {item.hasLab && <span>Lab Price: ${item.labPrice.toFixed(2)}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <CreditCard className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Payment Provider:</span>
                <Badge className='px-2 py-1 rounded-full text-xs font-semibold'>{order!.payment.provider}</Badge>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='h-5 w-5 text-gray-500' />
                <span className='font-semibold'>Payment Time:</span>
                <span>{formatDate(order!.payment.time)}</span>
              </div>
            </div>

            <div className='flex items-center justify-between border-t pt-4'>
              <span className='font-semibold text-lg'>Total Price:</span>
              <span className='text-lg text-green-600 font-bold'>${order!.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
