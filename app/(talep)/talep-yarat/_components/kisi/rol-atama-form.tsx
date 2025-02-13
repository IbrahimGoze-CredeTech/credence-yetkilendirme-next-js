import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { kisiAtanabilirRoller } from '@/actions/kisi-rol';
import { rolAtama } from '@/actions/rol-post';
import CardWrapper from '@/components/card-wrapper';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import type { Option } from '@/components/talep-ekran/multiple-selector';
// eslint-disable-next-line no-duplicate-imports
import MultipleSelector from '@/components/talep-ekran/multiple-selector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';
import { useStaticTablesContext } from '@/context';
import { toast } from '@/hooks/use-toast';
import { talepRolAtamaSchema } from '@/schemas';

export default function RolAtamaForm() {
  const staticTablesContext = useStaticTablesContext();
  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];
  const [roller, setRoller] = useState<string[]>([]);
  const rollerOptions: Option[] = roller.map((rol) =>
    ({ label: rol, value: rol })) || [];


  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);


  const form = useForm<z.infer<typeof talepRolAtamaSchema>>({
    resolver: zodResolver(talepRolAtamaSchema),
    defaultValues: {
      rolAdi: '',
      kisiAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof talepRolAtamaSchema>) => {
    setError('');
    setSuccess('');

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
              }}>Iptal</ToastAction>
            )
          });
        }

      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onValueChange = (value: string) => {
    startTransition(async () => {
      const roller = await kisiAtanabilirRoller(value);
      setRoller(roller);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  const onFormError: SubmitErrorHandler<z.infer<typeof talepRolAtamaSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper backButtonHref="/talep-ekran" backButtonLabel="Talepler Sayfasına Geri Don" headerLabel="Rol Atama">
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

            <FormField control={form.control} name="rolAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adi</FormLabel>
                <CustomCombobox Options={rollerOptions} disabled={isPending || !isKisiSelected} onValueChange={field.onChange} placeholder="Rol Ara" searchPlaceholder="Rol Ara..." />
              </FormItem>
            )} />

            <FormField control={form.control} name="baslamaTarihi" render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Başlangıç Tarihi</FormLabel>
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
                <FormLabel>Rol Bitiş Tarihi</FormLabel>
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
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Rol Atama Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
