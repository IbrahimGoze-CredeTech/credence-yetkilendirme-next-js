import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import BackButton from './back-button';
// import Header from './header';
// import Social from './social';
// import BackButton from './back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export default function CardWrapper({ children, headerLabel, backButtonLabel, backButtonHref }: CardWrapperProps) {
  return (
    <Card className='w-[800px] shadow-md'>
      <CardHeader>
        {/* <Header label={headerLabel}></Header> */}
        <h1 className='text-3xl font-semibold text-center'>{headerLabel}</h1>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
