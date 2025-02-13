'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { yetkiYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { yetkiSchema } from '@/schemas';

export default function YetkiEkleForm() {
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof yetkiSchema>>({
    resolver: zodResolver(yetkiSchema),
    defaultValues: {
      yetkiAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof yetkiSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      yetkiYaratma(values).then((data) => {

        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success)
          toast({
            title: "Rol başarıyla oluşturuldu",
            description: "Rol başarıyla oluşturuldu",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Yetki Yaratma">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-8'>

            <FormField control={form.control} name="yetkiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Yetki Adı" />
                </FormControl>

              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Yetki Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
