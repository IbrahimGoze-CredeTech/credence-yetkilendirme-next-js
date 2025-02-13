'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { yetkiSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { yetkiSchema } from '@/schemas';

export default function YetkiSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const yetkiOptions = staticTablesContext.yetkiler.map((yetki) => ({
    label: yetki.yetkiAdi, // Roller sadece ad içeriyor
    value: yetki.yetkiAdi,
  })) || [];
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
      yetkiSilme(values).then((data) => {
        if (!data.success) {
          // form.reset();
          setError(data?.error + "");
        }
        if (data.success) {
          form.reset();
          setSuccess("Yetki başarıyla silindi");
          toast({
            title: "Yetki başarıyla silindi",
            description: "Yetki başarıyla silindi.",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof yetkiSchema>> = (e) => {
    console.error(e);
    setError(e.yetkiAdi?.message);
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Yetki Sil">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className=''>

            <FormField control={form.control} name="yetkiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Adı</FormLabel>
                <FormControl>
                  <CustomCombobox Options={yetkiOptions} onValueChange={field.onChange} placeholder="Yetki Adı" searchPlaceholder="Yetki Adı İle Ara..." />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Yetki Sil</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
