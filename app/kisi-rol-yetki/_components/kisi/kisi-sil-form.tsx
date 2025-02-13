'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { kisiSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import type { Option } from '@/components/talep-ekran/multiple-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { kisiSilmeSchema } from '@/schemas';

export default function KisiSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const kullaniciAdlariOptions: Option[] = staticTablesContext.kullaniciAdlari.map((kullaniciAdi) =>
    ({ label: kullaniciAdi, value: kullaniciAdi })) || [];

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof kisiSilmeSchema>>({
    resolver: zodResolver(kisiSilmeSchema),
    defaultValues: {
      kullaniciAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof kisiSilmeSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      kisiSilme(values).then((data) => {
        if (!data.success) {
          setError(data.error + "");
        }
        if (data.success) {
          setSuccess('Kişi başarı ile silindi');
          toast({
            title: "Kişi başarıyla silindi",
            description: "Kişi başarıyla silindi",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof kisiSilmeSchema>> = (e) => {
    console.error(e);
    setError(e.kullaniciAdi?.message);
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Kişi Sil">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className=''>
            <FormField control={form.control} name="kullaniciAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <CustomCombobox Options={kullaniciAdlariOptions} onValueChange={field.onChange} placeholder="Kullanıcı Adı" searchPlaceholder="Kullanıcı Adı İle Ara..." />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Kişi Sil</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
