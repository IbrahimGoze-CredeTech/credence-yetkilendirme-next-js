'use client'

import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import React, { useState, useTransition } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KisiSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { kisiYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';


export default function KisiEkleForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof KisiSchema>>({
    resolver: zodResolver(KisiSchema),
    defaultValues: {
      kisiAdi: '',
      kisiSoyadi: '',
      kullaniciAdi: '',
      kisiSifre: ''
    }
  });

  const onSubmit = (values: z.infer<typeof KisiSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      kisiYaratma(values).then((data) => {
        // console.log('data: ', data);

        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          // form.reset();
          setSuccess("Kişi başarıyla oluşturuldu")
          toast({
            title: "Kişi başarıyla oluşturuldu",
            description: "Kişi başarıyla oluşturuldu ve supervisor onayı beklemektedir.",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
                console.log("undo clicked");
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof KisiSchema>> = (e) => {
    console.error(e);
    setError(e.kullaniciAdi?.message || e.kisiAdi?.message || e.kisiSoyadi?.message || e.kisiSifre?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Kişi Yaratma'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className='grid grid-cols-2 gap-8'>

            <FormField control={form.control} name={'kisiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kişi Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Kisi Adi" />
                </FormControl>

              </FormItem>
            )} />
            <FormField control={form.control} name={'kisiSoyadi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kişi Soyadı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Kisi SoyAdi" />
                </FormControl>

              </FormItem>
            )} />
            <FormField control={form.control} name={'kullaniciAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="burak.pozut" />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name={'kisiSifre'} render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type='password' />
                </FormControl>
              </FormItem>
            )} />

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Kişi Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
