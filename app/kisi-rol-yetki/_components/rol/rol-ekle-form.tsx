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
import { RolSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStaticTablesContext } from '@/context';
import { rolYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';

export default function RolEkleForm() {
  const staticTablesContext = useStaticTablesContext();
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RolSchema>>({
    resolver: zodResolver(RolSchema),
    defaultValues: {
      rolAdi: '',
      supervizorRol: '',
      riskWeight: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RolSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      rolYaratma(values).then((data) => {

        if (data?.error) {
          // form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess("Rol başarıyla oluşturuldu")
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

  const onFormError: SubmitErrorHandler<z.infer<typeof RolSchema>> = (e) => {
    console.error(e);
    setError(e.rolAdi?.message || e.supervizorRol?.message || e.riskWeight?.message);
  }

  return (
    <CardWrapper className='!w-[500px]' headerLabel={'Rol Yaratma'} backButtonLabel={'Ana Sayfaya Geri Don'} backButtonHref={'/'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className='grid grid-cols-2 gap-8'>

            <FormField control={form.control} name={'rolAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rol Adı" />
                </FormControl>

              </FormItem>
            )} />

            <FormField control={form.control} name={'supervizorRol'} render={({ field }) => (
              <FormItem>
                <FormLabel>Supervisor Adi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Supervisor Rol" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roller</SelectLabel>
                      {staticTablesContext.roller.map((rol) => (
                        <SelectItem key={rol.rolAdi} value={rol.rolAdi}>{rol.rolAdi}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            <FormField control={form.control} name={'riskWeight'} render={({ field }) => (
              <FormItem>
                <FormLabel>Risk</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Risk" type='number' />
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
