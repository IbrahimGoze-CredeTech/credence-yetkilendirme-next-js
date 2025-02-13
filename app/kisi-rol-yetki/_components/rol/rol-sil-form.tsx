'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { rolSilme } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { rolSilSchema } from '@/schemas';

export default function RolSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const rollerOptions = staticTablesContext.roller.map((rol) => ({
    label: rol.rolAdi, // Roller sadece ad içeriyor
    value: rol.rolAdi,
  })) || [];
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof rolSilSchema>>({
    resolver: zodResolver(rolSilSchema),
    defaultValues: {
      rolAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof rolSilSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      rolSilme(values).then((data) => {
        if (!data.success) {
          // form.reset();
          setError(data?.error + "");
        }
        if (data.success) {
          form.reset();
          setSuccess("Rol başarıyla silindi");
          toast({
            title: "Rol başarıyla silindi",
            description: "Rol başarıyla silindi.",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof rolSilSchema>> = (e) => {
    console.error(e);
    setError(e.rolAdi?.message);
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Rol Silme">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className=''>

            <FormField control={form.control} name="rolAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adı</FormLabel>
                <FormControl>
                  <CustomCombobox Options={rollerOptions} onValueChange={field.onChange} placeholder="Rol Adı" searchPlaceholder="Rol Adı İle Ara..." />
                </FormControl>

              </FormItem>
            )} />

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Rol Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
