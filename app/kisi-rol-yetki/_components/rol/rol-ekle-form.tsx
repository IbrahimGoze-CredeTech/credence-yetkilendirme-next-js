'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { rolYaratma } from '@/actions/kisi-rol-yetki-sayfa-actions';
import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { rolSchema } from '@/schemas';

export default function RolEkleForm() {
  const staticTablesContext = useStaticTablesContext();
  const [isPending, startTransition] = useTransition();


  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof rolSchema>>({
    resolver: zodResolver(rolSchema),
    defaultValues: {
      rolAdi: '',
      supervizorRol: '',
      riskWeight: "",
    }
  });

  const onSubmit = (values: z.infer<typeof rolSchema>) => {
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

  const onFormError: SubmitErrorHandler<z.infer<typeof rolSchema>> = (e) => {
    console.error(e);
    setError(e.rolAdi?.message || e.supervizorRol?.message || e.riskWeight?.message);
  }

  return (
    <CardWrapper backButtonHref="/" backButtonLabel="Ana Sayfaya Geri Don" className='!w-[500px]' headerLabel="Rol Yaratma">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className='grid grid-cols-2 gap-8'>

            <FormField control={form.control} name="rolAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adı</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rol Adı" />
                </FormControl>

              </FormItem>
            )} />

            <FormField control={form.control} name="supervizorRol" render={({ field }) => (
              <FormItem>
                <FormLabel>Supervisor Adi</FormLabel>
                <Select defaultValue={field.value} disabled={isPending} onValueChange={field.onChange}>
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

            <FormField control={form.control} name="riskWeight" render={({ field }) => (
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
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Rol Yarat</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
