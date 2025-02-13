'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { SayfaYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { sayfaSchema } from '@/schemas';

export default function SayfaEkleForm() {
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof sayfaSchema>>({
    resolver: zodResolver(sayfaSchema),
    defaultValues: {
      sayfaRoute: '',
    }
  });

  const onSubmit = (values: z.infer<typeof sayfaSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      SayfaYaratma(values).then((data) => {
        if (!data.success) {
          setError(data.error);
        }
        if (data.success) {
          form.reset();
          setSuccess("Sayfa Başarıyla Oluşturuldu");
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

  const onFormError: SubmitErrorHandler<z.infer<typeof sayfaSchema>> = (e) => {
    console.error(e);
    setError(e.sayfaRoute?.message);
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Sayfa Yaratma">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className='grid gap-8'>
            <FormField control={form.control} name="sayfaRoute" render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adı</FormLabel>
                <FormControl>
                  <Input {...field}
                    placeholder="Sayfa Adı" />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Sayfa Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
