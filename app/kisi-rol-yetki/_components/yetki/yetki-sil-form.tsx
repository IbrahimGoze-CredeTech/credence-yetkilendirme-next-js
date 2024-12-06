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
import { YetkiSchema } from '@/schemas';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import CustomCombobox from '@/components/custom-combobox';
import { yetkiSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';

export default function YetkiSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const yetkiOptions = staticTablesContext.yetkiler.map((yetki) => ({
    label: yetki.yetkiAdi, // Roller sadece ad içeriyor
    value: yetki.yetkiAdi,
  })) || [];
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof YetkiSchema>>({
    resolver: zodResolver(YetkiSchema),
    defaultValues: {
      yetkiAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof YetkiSchema>) => {
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

  const onFormError: SubmitErrorHandler<z.infer<typeof YetkiSchema>> = (e) => {
    console.error(e);
    setError(e.yetkiAdi?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Yetki Sil'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className=''>

            <FormField control={form.control} name={'yetkiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Adı</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={field.onChange} Options={yetkiOptions} placeholder={'Yetki Adı'} searchPlaceholder={'Yetki Adı İle Ara...'} />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Yetki Sil</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
