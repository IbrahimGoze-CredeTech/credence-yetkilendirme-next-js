import CardWrapper from '@/components/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import MultipleSelector, { Option } from '@/components/talep-ekran/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import React, { useState, useTransition } from 'react'
import { useStaticTablesContext } from '@/context';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TalepRolSayfaCikarmaSchema } from '@/schemas';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import { RolCikarilabilirSayfalar, rolSayfaCikarmaPost } from '@/actions/rol-sayfa';

export default function RolSayfaCikarmaForm() {
  const staticTablesContext = useStaticTablesContext();
  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];
  const rollerOptions: Option[] = staticTablesContext.roller.map((rol) => ({
    label: rol.rolAdi, // Roller sadece ad içeriyor
    value: rol.rolAdi,
  })) || [];
  const [sayfalar, setSayfalar] = useState<string[]>([]);
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


  const form = useForm<z.infer<typeof TalepRolSayfaCikarmaSchema>>({
    resolver: zodResolver(TalepRolSayfaCikarmaSchema),
    defaultValues: {
      SayfaRoute: '',
      rolAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TalepRolSayfaCikarmaSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      rolSayfaCikarmaPost(values).then((data) => {
        if (data?.error) {
          // form.reset();
          setError(data.error);
        }
        if (data.success) {
          form.reset();
          setSuccess("Talep başarıyla oluşturuldu")
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
    // console.log(value);

    startTransition(async () => {
      const sayfalar = await RolCikarilabilirSayfalar(value);
      setSayfalar(sayfalar);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  const onFormError: SubmitErrorHandler<z.infer<typeof TalepRolSayfaCikarmaSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper headerLabel={'Rol Sayfa Çıkarma'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
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
                {kisilerOptions.length > 0 ? (
                  <MultipleSelector defaultOptions={kisilerOptions} onChange={(e) => {
                    console.log("onChange", e);
                    form.setValue('ekstraImza', e);
                  }} placeholder="Imza atacak kişileri seçin" disabled={isPending || !isKisiSelected} />
                ) : (<span>Yükleniyor...</span>)}
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Rol Sayfa Çıkarma Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
