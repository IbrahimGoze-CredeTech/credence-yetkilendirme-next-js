import { yetkiEdit } from '@/actions/yetki-edit';
import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import MultipleSelector, { Option } from '@/components/talep-ekran/multiple-selector';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { eylemTuruStringArray } from '@/modals/eylemTuru';
import { YetkiEditSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function YetkiEditForm() {
  const staticTablesContext = useStaticTablesContext();
  const OPTIONS: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);

  const form = useForm<z.infer<typeof YetkiEditSchema>>({
    resolver: zodResolver(YetkiEditSchema),
    defaultValues: {
      yetkiBaslamaTarihi: new Date(),
      yetkiBitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    }
  });

  const onSubmit = (values: z.infer<typeof YetkiEditSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      yetkiEdit(values).then((data) => {
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
    });


  }

  return (
    <CardWrapper headerLabel={'Yetki Değiştirme'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>

            {/* Kisi Filed */}
            <FormField control={form.control} name={'kisiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kisi</FormLabel>
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

            {/* Yetki Field */}
            <FormField control={form.control} name={'yetkiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Yetki Seç" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Yetkiler</SelectLabel>
                      {staticTablesContext.yetkiler.map((yetki) => (
                        <SelectItem key={yetki.yetkiId} value={yetki.yetkiAdi}>{yetki.yetkiAdi}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <FormField control={form.control} name='eylemTuru' render={({ field }) => (
              <FormItem>
                <FormLabel>Eylem Türü</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Eylem Türü Seç" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Eylem Türleri</SelectLabel>
                      {eylemTuruStringArray.map((eylem) => (
                        <SelectItem key={eylem} value={eylem}>{eylem}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            {/* Yetki baslama Tarihi */}
            <FormField control={form.control} name={'yetkiBaslamaTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Başlangıç Tarihi</FormLabel>
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

            {/* Yetki Bitis Tarihi */}
            <FormField control={form.control} name={'yetkiBitisTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Bitiş Tarihi</FormLabel>
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
            <Button type='submit' className='w-full' disabled={isPending}>Yetki Değiştirme Talebi Olustur</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
