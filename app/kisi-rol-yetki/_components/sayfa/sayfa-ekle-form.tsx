'use client';

import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import React, { useState, useTransition } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SayfaSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { SayfaYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';

export default function SayfaEkleForm() {
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SayfaSchema>>({
    resolver: zodResolver(SayfaSchema),
    defaultValues: {
      sayfaRoute: '',
    }
  });

  const onSubmit = (values: z.infer<typeof SayfaSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      SayfaYaratma(values).then((data) => {
        // console.log('data: ', data);

        if (!data.success) {
          // form.reset();
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

  const onFormError: SubmitErrorHandler<z.infer<typeof SayfaSchema>> = (e) => {
    console.error(e);
    setError(e.sayfaRoute?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Sayfa Yaratma'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className='grid gap-8'>
            <FormField control={form.control} name={'sayfaRoute'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adı</FormLabel>
                <FormControl>
                  <Input {...field}
                    // value={field.value.startsWith('/') ? field.value : `/${field.value}`} // Ensure starts with "/"
                    // onChange={(e) => {
                    //   const newValue = e.target.value; // Extract the new value from the event
                    //   form.setValue('sayfaRoute', newValue.startsWith('/') ? newValue : `/${newValue}`); // Ensure new value starts with "/"
                    // }}
                    placeholder="Sayfa Adı" />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Sayfa Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
