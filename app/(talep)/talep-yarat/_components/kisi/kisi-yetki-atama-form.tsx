/* eslint-disable no-duplicate-imports */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { kisiAtanabilirYetkiler } from '@/actions/kisi-yetki';
import { yetkiEdit } from '@/actions/yetki-post';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import type { Option } from '@/components/talep-ekran/multiple-selector';
import MultipleSelector from '@/components/talep-ekran/multiple-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { eylemTuruStringArray } from '@/modals/eylemTuru';
import { yetkiTalepSchema } from '@/schemas';

type KisiYetkiType = { yetkiAdi: string, eylemTuruId: number };

export default function KisiYetkiAtamaFrom() {
  const staticTablesContext = useStaticTablesContext();
  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];

  const [kisiYetkiler, setKisiYetkiler] = useState<KisiYetkiType[]>([]);
  const yetkilerOptions: Option[] = kisiYetkiler.map((yetki) =>
    ({ label: yetki.yetkiAdi, value: yetki.yetkiAdi })) || [];

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");

  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);


  const form = useForm<z.infer<typeof yetkiTalepSchema>>({
    resolver: zodResolver(yetkiTalepSchema),
    defaultValues: {
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      eylemTuru: 'Oku',
    }
  });

  const onSubmit = (values: z.infer<typeof yetkiTalepSchema>) => {
    setError('');
    setSuccess('');

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
              }}>Iptal</ToastAction>
            )
          });
        }

      }).catch(() => setError('Something went wrong!'));
    });
  }

  const onValueChange = async (value: string) => {
    const yetkiler = await kisiAtanabilirYetkiler(value);
    setKisiYetkiler(yetkiler);
    setIsKisiSelected(true); // Update boolean based on whether there's a value
  };

  return (
    <CardWrapper backButtonHref="/talep-ekran" backButtonLabel="Talepler Sayfasına Geri Don" headerLabel="Yetki Değiştirme">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-8'>

            {/* Kisi Filed */}
            <FormField control={form.control} name="kisiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Kisi</FormLabel>
                <CustomCombobox Options={kisilerOptions} onValueChange={(value) => { field.onChange(value); onValueChange(value) }} placeholder="Kişi Ara" searchPlaceholder="Kişi Ara..." />
              </FormItem>
            )} />

            {/* Yetki Field */}
            <FormField control={form.control} name="yetkiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki</FormLabel>
                <CustomCombobox Options={yetkilerOptions} disabled={isPending || !isKisiSelected} onValueChange={(value) => { field.onChange(value) }} placeholder="Yetki Ara" searchPlaceholder="Yetki Ara..." />
              </FormItem>
            )} />

            <FormField control={form.control} name='eylemTuru' render={({ field }) => (
              <FormItem>
                <FormLabel>Eylem Türü</FormLabel>
                <Select defaultValue={field.value} disabled={isPending || !isKisiSelected} onValueChange={field.onChange} value={field.value}>
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
            <FormField control={form.control} name="baslamaTarihi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Başlangıç Tarihi</FormLabel>
                <CustomDatePicker
                  isDisabled={isPending || !isKisiSelected}
                  isOpen={isBaslangicOpen}
                  onDateChange={field.onChange}
                  selectedDate={field.value}
                  setIsOpen={setIsBaslangicOpen}
                />
              </FormItem>
            )} />

            {/* Yetki Bitis Tarihi */}
            <FormField control={form.control} name="bitisTarihi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Bitiş Tarihi</FormLabel>
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
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Yetki Değiştirme Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper >
  )
}
