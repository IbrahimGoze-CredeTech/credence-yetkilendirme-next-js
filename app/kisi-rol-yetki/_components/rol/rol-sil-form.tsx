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
import { RolSilSchema } from '@/schemas';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { rolSilme } from '@/actions/rol-yaratma';
import CustomCombobox from '@/components/custom-combobox';

export default function RolSilForm() {
  const staticTablesContext = useStaticTablesContext();
  const rollerOptions = staticTablesContext.roller.map((rol) => ({
    label: rol.rolAdi, // Roller sadece ad içeriyor
    value: rol.rolAdi,
  })) || [];
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RolSilSchema>>({
    resolver: zodResolver(RolSilSchema),
    defaultValues: {
      rolAdi: '',
    }
  });

  const onSubmit = (values: z.infer<typeof RolSilSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      rolSilme(values).then((data) => {
        // console.log('data: ', data);
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
                console.log("undo clicked");
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof RolSilSchema>> = (e) => {
    console.error(e);
    setError(e.rolAdi?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Rol Silme'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className=''>

            <FormField control={form.control} name={'rolAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adı</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={field.onChange} Options={rollerOptions} placeholder={'Rol Adı'} searchPlaceholder={'Rol Adı İle Ara...'} />
                </FormControl>

              </FormItem>
            )} />

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Rol Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
