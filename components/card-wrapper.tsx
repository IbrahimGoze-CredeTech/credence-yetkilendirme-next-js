import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import BackButton from './back-button';

// import Header from './header';
// import Social from './social';
// import BackButton from './back-button';

interface ICardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string;
}

export default function CardWrapper({ className, children, headerLabel, backButtonLabel, backButtonHref }: ICardWrapperProps) {
  return (
    <Card className={cn('w-[800px] shadow-md}', className)}>
      <CardHeader>
        {/* <Header label={headerLabel}></Header> */}
        <h1 className='text-3xl font-semibold text-center'>{headerLabel}</h1>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
