import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';

import Icon from './Icon';

export default function LucideIconSelector({ onSelectIcon }: { onSelectIcon: (iconName: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);

  console.log('LucideIcons', LucideIcons);

  const iconNames = Object.keys(LucideIcons).filter(
    (key) => typeof LucideIcons[key] === 'function' && key !== 'default',
  );

  console.log('iconNames', iconNames);

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    setOpen(false);
    onSelectIcon(iconName);
  };

  const SelectedIcon = selectedIcon ? LucideIcons[selectedIcon as keyof typeof LucideIcons] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[280px] justify-between'>
          {selectedIcon ? (
            <>
              {SelectedIcon && React.createElement(SelectedIcon, { className: 'mr-2 h-4 w-4' })}
              {selectedIcon}
            </>
          ) : (
            'Select an icon'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0'>
        <Command>
          <CommandInput placeholder='Search icons...' />
          <CommandEmpty>No icon found.</CommandEmpty>
          <CommandGroup className='max-h-[300px] overflow-y-auto'>
            {iconNames.map((iconName) => {
              return (
                <CommandItem key={iconName} onSelect={() => handleSelectIcon(iconName)}>
                  <Icon name={iconName} color='#ddd' size={16} />
                  {iconName}
                  <Check className={cn('ml-auto h-4 w-4', selectedIcon === iconName ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
