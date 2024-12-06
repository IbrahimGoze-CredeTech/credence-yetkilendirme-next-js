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
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { sayfaSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';
import { useStaticTablesContext } from '@/context';
import CustomCombobox from '@/components/custom-combobox';

export default function SayfaSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const sayfaOptions = staticTablesContext.sayfalar.map((sayfa) => ({
    label: sayfa, // Roller sadece ad içeriyor
    value: sayfa,
  })) || [];
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
      sayfaSilme(values).then((data) => {
        if (!data.success) {
          // form.reset();
          setError(data?.error + "");
        }
        if (data.success) {
          form.reset();
          setSuccess("Sayfa başarıyla silindi");
          toast({
            title: "Sayfa başarıyla silindi",
            description: "Sayfa başarıyla silindi.",
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
    <CardWrapper className='!w-[500px]' headerLabel={'Sayfa Sil'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className='grid gap-8'>

            <FormField control={form.control} name={'sayfaRoute'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adı</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={field.onChange} Options={sayfaOptions} placeholder={'Sayfa Adı'} searchPlaceholder={'Sayfa Adı İle Ara...'} />
                </FormControl>
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Sayfa Sil</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
