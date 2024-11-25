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
import { KisiSilmeSchema } from '@/schemas';
import { Option } from '@/components/talep-ekran/multiple-selector';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import CustomCombobox from '@/components/custom-combobox';
import { useStaticTablesContext } from '@/context';
import { kisiSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';

export default function KisiSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const kullaniciAdlariOptions: Option[] = staticTablesContext.kullaniciAdlari.map((kullaniciAdi) =>
    ({ label: kullaniciAdi, value: kullaniciAdi })) || [];

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof KisiSilmeSchema>>({
    resolver: zodResolver(KisiSilmeSchema),
    defaultValues: {
      kullaniciAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof KisiSilmeSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

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
                console.log("undo clicked");
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof KisiSilmeSchema>> = (e) => {
    console.error(e);
    setError(e.kullaniciAdi?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Kişi Sil'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className=''>
            <FormField control={form.control} name={'kullaniciAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={field.onChange} Options={kullaniciAdlariOptions} placeholder={'Kullanıcı Adı'} searchPlaceholder={'Kullanıcı Adı İle Ara...'} />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Kişi Sil</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
