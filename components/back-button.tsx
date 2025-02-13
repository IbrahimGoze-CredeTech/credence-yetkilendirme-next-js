"use client"

import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';

interface IBackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: IBackButtonProps) {
  return (
    <Button asChild className='font-normal w-full' size="sm" variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
