/* eslint-disable no-duplicate-imports */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import type { SubmitErrorHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { kisiCikarilabilirSayfalar, kisiSayfaCikarmaPost } from '@/actions/kisi-sayfa';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import type { Option } from '@/components/talep-ekran/multiple-selector';
import MultipleSelector from '@/components/talep-ekran/multiple-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { talepKisiSayfaCikarmaSchema } from '@/schemas';

export default function KisiSayfaAtamaForm() {
  const staticTablesContext = useStaticTablesContext();
  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];

  const [sayfalar, setSayfalar] = useState<string[]>([]);
  const sayfalarOptions: Option[] = sayfalar.map((sayfa) =>
    ({ label: sayfa, value: sayfa })) || [];


  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);
  // const [sayfalar, setSayfalar] = useState([])


  const form = useForm<z.infer<typeof talepKisiSayfaCikarmaSchema>>({
    resolver: zodResolver(talepKisiSayfaCikarmaSchema),
    defaultValues: {
      sayfaRoute: '',
      kisiAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof talepKisiSayfaCikarmaSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      kisiSayfaCikarmaPost(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data.success) {
          form.reset();
          setSuccess("Talep başarıyla oluşturuldu");
          toast({
            title: "Talep başarıyla oluşturuldu",
            description: "Talebiniz başarıyla oluşturuldu ve supervisor onayı beklemektedir.",
            action: (
              <ToastAction altText="Goto schedule to undo" onClick={() => {
              }}>Iptal</ToastAction>
            )
          });
        }
      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onValueChange = (value: string) => {
    startTransition(async () => {
      const sayfalar = await kisiCikarilabilirSayfalar(value);
      setSayfalar(sayfalar);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  const onFormError: SubmitErrorHandler<z.infer<typeof talepKisiSayfaCikarmaSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper backButtonHref="/talep-ekran" backButtonLabel="Talepler Sayfasına Geri Don" headerLabel="Kişi Sayfa Çıkarma">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className='grid grid-cols-2 gap-8'>
            <FormField control={form.control} name="kisiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Kisi Adi</FormLabel>
                <FormControl>
                  <CustomCombobox Options={kisilerOptions} onValueChange={(value) => { field.onChange(value); onValueChange(value) }} placeholder="Kişi Ara" searchPlaceholder="Kişi Ara..." />
                </FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="sayfaRoute" render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adi</FormLabel>
                <CustomCombobox Options={sayfalarOptions} disabled={isPending || !isKisiSelected} onValueChange={field.onChange} placeholder="Sayfa Ara" searchPlaceholder="Sayfa Ara..." />
              </FormItem>
            )} />

            <FormField control={form.control} name="baslamaTarihi" render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Başlangıç Tarihi</FormLabel>
                <CustomDatePicker
                  isDisabled={isPending || !isKisiSelected}
                  isOpen={isBaslangicOpen}
                  onDateChange={field.onChange}
                  selectedDate={field.value}
                  setIsOpen={setIsBaslangicOpen}
                />
              </FormItem>
            )} />

            <FormField control={form.control} name="bitisTarihi" render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Bitiş Tarihi</FormLabel>
                <CustomDatePicker
                  isDisabled={isPending || !isKisiSelected}
                  isOpen={isBitisOpen}
                  onDateChange={field.onChange}
                  selectedDate={field.value}
                  setIsOpen={setIsBitisOpen}
                />

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
                    disabled={isPending || !isKisiSelected}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
            />

            <FormField control={form.control} name="ekstraImza" render={({ }) => (
              <FormItem>
                <FormLabel>Ekstra Imza Yetkilileri</FormLabel>
                {kisilerOptions.length > 0 ? (
                  <MultipleSelector defaultOptions={kisilerOptions} disabled={isPending || !isKisiSelected} onChange={(e) => {
                    form.setValue('ekstraImza', e);
                  }} placeholder="Imza atacak kişileri seçin" />
                ) : (<span>Yükleniyor...</span>)}
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Sayfa Atama Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
