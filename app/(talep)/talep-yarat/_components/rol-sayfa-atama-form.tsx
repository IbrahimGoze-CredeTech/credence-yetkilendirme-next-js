import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import MultipleSelector, { Option } from '@/components/talep-ekran/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import React, { useState, useTransition } from 'react'
import { useStaticTablesContext } from '@/context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TalepRolSayfaAtamaSchema } from '@/schemas';
import { sayfaAtama } from '@/actions/sayfa-rol-atama';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import { rollerVeSayfalar } from '@/actions/sayfa-rol';

export default function RolSayfaAtamaForm() {
  const staticTablesContext = useStaticTablesContext();
  const rollerOptions: Option[] = staticTablesContext.roller.map((rol) => ({
    label: rol.rolAdi, // Roller sadece ad içeriyor
    value: rol.rolAdi,
  })) || [];
  const [sayfalar] = useState<string[]>([]);
  const sayfalarOptions = sayfalar.map((sayfa) => ({
    label: sayfa,
    value: sayfa,
  })) || [];
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);


  const form = useForm<z.infer<typeof TalepRolSayfaAtamaSchema>>({
    resolver: zodResolver(TalepRolSayfaAtamaSchema),
    defaultValues: {
      SayfaRoute: '',
      rolAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TalepRolSayfaAtamaSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      sayfaAtama(values).then((data) => {
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

  const onValueChange = (value: string) => {
    console.log(value);

    startTransition(async () => {
      await rollerVeSayfalar();
      // const SayfaRoute = await sayfaAtama(value);
      // setSayfalar(SayfaRoute);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  return (
    <CardWrapper headerLabel={'Rol Sayfa Atama'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
          <div className='grid grid-cols-2 gap-8'>
            <FormField control={form.control} name={'rolAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adi</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={(value) => { field.onChange(value); onValueChange(value) }} Options={rollerOptions} placeholder={'Rol Ara'} searchPlaceholder={'Rol Ara...'} />
                </FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name={'SayfaRoute'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adi</FormLabel>
                <CustomCombobox onValueChange={field.onChange} Options={sayfalarOptions} placeholder={'Sayfa Ara'} searchPlaceholder={'Sayfa Ara...'} disabled={isPending || !isKisiSelected} />
              </FormItem>
            )} />

            <FormField control={form.control} name={'baslamaTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Başlangıç Tarihi</FormLabel>
                <CustomDatePicker
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                  isOpen={isBaslangicOpen}
                  setIsOpen={setIsBaslangicOpen}
                  isDisabled={isPending || !isKisiSelected}
                />
              </FormItem>
            )} />

            <FormField control={form.control} name={'bitisTarihi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Bitiş Tarihi</FormLabel>
                <CustomDatePicker
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                  isOpen={isBitisOpen}
                  setIsOpen={setIsBitisOpen}
                  isDisabled={isPending || !isKisiSelected}
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
                    onCheckedChange={field.onChange}
                    disabled={isPending || !isKisiSelected}
                  />
                </FormControl>
              </FormItem>
            )}
            />

            <FormField control={form.control} name={'ekstraImza'} render={({ }) => (
              <FormItem>
                <FormLabel>Ekstra Imza Yetkilileri</FormLabel>
                {rollerOptions.length > 0 ? (
                  <MultipleSelector defaultOptions={rollerOptions} onChange={(e) => {
                    console.log("onChange", e);
                    form.setValue('ekstraImza', e);
                  }} placeholder="Imza atacak kişileri seçin" disabled={isPending || !isKisiSelected} />
                ) : (<span>Yükleniyor...</span>)}
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Sayfa Atama Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
