'use client';

import CardWrapper from '@/components/card-wrapper'
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription } from '@/components/ui/form'
import { TalepRolAtamaSchema } from '@/schemas';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStaticTablesContext } from '@/context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from '@/lib/utils';
import { tr } from 'date-fns/locale';
import { format } from "date-fns"
import { Switch } from '@/components/ui/switch';
import MultipleSelector, { Option } from '@/components/talep-ekran/multiple-selector';
import { rolAtama } from '@/actions/rol-atama';


export default function TalepYaratPage() {
  const staticTablesContext = useStaticTablesContext();
  const OPTIONS: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];


  const [isPending, startTransition] = useTransition();

  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");


  const form = useForm<z.infer<typeof TalepRolAtamaSchema>>({
    resolver: zodResolver(TalepRolAtamaSchema),
    defaultValues: {
      rolAdi: '',
      kisiAdi: '',
      rolBaslamaTarihi: new Date(),
      rolBitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TalepRolAtamaSchema>) => {
    setError('');
    setSuccess('');
    console.log('values: ', values);

    startTransition(() => {
      rolAtama(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data.success) {
          form.reset();
          setSuccess(data.success)
        }

      }).catch(() => setError('Something went wrong!'));
    })
  }

  return (
    <CardWrapper headerLabel={'Talep Yaratma'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField control={form.control} name={'rolAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol Seç" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roller</SelectLabel>
                      {staticTablesContext.roller.map((rol) => (
                        <SelectItem key={rol.rolId} value={rol.rolAdi}>{rol.rolAdi}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            <FormField control={form.control} name={'kisiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kisi Adi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kişi Seç" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kişiler</SelectLabel>
                      {staticTablesContext.kisiler.map((kisi) => (
                        <SelectItem key={kisi.kisiSoyadi} value={kisi.kisiAdi + " " + kisi.kisiSoyadi}>{kisi.kisiAdi + " " + kisi.kisiSoyadi}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            <FormField control={form.control} name={'rolBaslamaTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Başlangıç Tarihi</FormLabel>
                <Popover open={isBaslangicOpen} onOpenChange={setIsBaslangicOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: tr }) // Apply Turkish locale
                        ) : (
                          <span>Tarih Seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsBaslangicOpen(false)
                      }}
                      initialFocus
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )} />

            <FormField control={form.control} name={'rolBitisTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Bitiş Tarihi</FormLabel>
                <Popover open={isBitisOpen} onOpenChange={setIsBitisOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: tr }) // Apply Turkish locale
                        ) : (
                          <span>Tarih Seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsBitisOpen(false)
                      }}
                      initialFocus
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )} />

            <FormField
              control={form.control}
              name="ciftImza"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Çift İmza</FormLabel>
                    <FormDescription>
                      Talebin iki kat supervisor onay alması gerekiyor mu?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField control={form.control} name={'ekstraImza'} render={({ field }) => (
              <FormItem>
                <FormLabel>Ekstra Imza Yetkilileri</FormLabel>
                {OPTIONS.length > 0 ? (
                  <MultipleSelector defaultOptions={OPTIONS} onChange={(e) => {
                    console.log("onChange", e);
                    form.setValue('ekstraImza', e);
                  }} placeholder="Imza atacak kişileri seçin" />
                ) : (<span>Yükleniyor...</span>)}
              </FormItem>
            )} />
            <Button type='submit' className='w-full' disabled={isPending}>Rol Atama Talebi Olustur</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}


