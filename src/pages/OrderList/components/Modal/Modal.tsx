import { useState } from 'react';
import { Clock, ShoppingCart, Star } from 'lucide-react';

import { Row } from '@tanstack/react-table';

import { Badge } from '~components/ui/badge';
import { Button } from '~components/ui/button';
import { Card, CardContent } from '~components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/dialog';
import { Separator } from '~components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { Product } from '~graphql/graphql';
import { useGetProductById } from '~hooks/useGetProductById';

interface ModalProps {
  row: Row<Product>;
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}

const Modal = ({ row, open, onOpen, onClose }: ModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const { data: product } = useGetProductById(parseInt(row.original.id));

  return (
    product && (
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogContent className='max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle className='mb-3'>Product Detail</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue='details' className='w-full'>
            <TabsList>
              <TabsTrigger value='details'>Details</TabsTrigger>
              <TabsTrigger value='images'>Images</TabsTrigger>
            </TabsList>
            <TabsContent value='details'>
              <Card>
                <CardContent className='space-y-4 pt-4'>
                  <div className='flex items-center justify-between'>
                    <div className='text-3xl font-bold'>${product.price.toLocaleString()}</div>
                    <div className='flex items-center space-x-2'>
                      <Star className='w-5 h-5 text-yellow-400 fill-current' />
                      <span className='font-semibold'>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2 text-sm text-gray-500'>
                    <ShoppingCart className='w-4 h-4' />
                    <span>{product.sold} sold</span>
                    <Separator orientation='vertical' className='h-4' />
                    <Clock className='w-4 h-4' />
                  </div>

                  <Separator />

                  <div>
                    <h3 className='font-semibold mb-2'>Description</h3>
                    <p className='text-sm text-gray-600'>{product.description}</p>
                  </div>

                  <Separator />
                  <div className='flex flex-wrap gap-2'>
                    {product.categories.map((category, index) => (
                      <Badge key={index} variant='secondary' className='text-sm py-1 px-2'>
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='images'>
              <Card>
                <CardContent className='pt-4'>
                  <div className='space-y-4'>
                    <div className='relative aspect-square overflow-hidden rounded-lg'>
                      <img src={product.images[currentImage]?.url} alt={product.name} />
                    </div>
                    <div className='flex space-x-2 overflow-x-auto pb-2'>
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          type='button'
                          className={`relative w-20 h-20 rounded-md overflow-hidden ${
                            index === currentImage ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setCurrentImage(index)}
                        >
                          <img src={image?.url} alt={`${product.name} ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default Modal;
