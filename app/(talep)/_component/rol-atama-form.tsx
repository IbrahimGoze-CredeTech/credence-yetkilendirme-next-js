import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from "@radix-ui/react-icons"
import MultipleSelector, { Option } from '@/components/talep-ekran/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import React, { useState, useTransition } from 'react'
import { useStaticTablesContext } from '@/context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TalepRolAtamaSchema } from '@/schemas';
import { rolAtama } from '@/actions/rol-atama';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { tr } from 'date-fns/locale';
import { format } from "date-fns"



export default function RolAtamaForm() {
  const staticTablesContext = useStaticTablesContext();
  const OPTIONS: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);

  const form = useForm<z.infer<typeof TalepRolAtamaSchema>>({
    resolver: zodResolver(TalepRolAtamaSchema),
    defaultValues: {
      rolAdi: '',
      kisiAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TalepRolAtamaSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      rolAtama(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data.success) {
          form.reset();
          setSuccess(data.success)
          toast({
            title: "Talep başarıyla oluşturuldu",
            description: "Talebiniz başarıyla oluşturuldu ve supervisor onayı beklemektedir.",
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

  return (
    <CardWrapper headerLabel={'Rol Atama'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
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

            <FormField control={form.control} name={'baslamaTarihi'} render={({ field }) => (
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

            <FormField control={form.control} name={'bitisTarihi'} render={({ field }) => (
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

            <FormField control={form.control} name="ciftImza" render={({ field }) => (
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

            <FormField control={form.control} name={'ekstraImza'} render={({ }) => (
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full' disabled={isPending}>Rol Atama Talebi Olustur</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
