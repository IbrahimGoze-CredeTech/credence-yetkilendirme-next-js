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
import { TalepKisiSayfaEditSchema } from '@/schemas';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import { kisininSayfalar, kisiSayfaEditPost } from '@/actions/kisi-sayfa';
import { KisiSayfaFromType } from '@/types';

export default function KisiSayfaEditForm() {
  const staticTablesContext = useStaticTablesContext();
  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];

  const [sayfalar, setSayfalar] = useState<KisiSayfaFromType[]>([]);
  const sayfalarOptions: Option[] = sayfalar.map((sayfa) =>
    ({ label: sayfa.sayfaRoute, value: sayfa.sayfaRoute })) || [];


  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);
  // const [sayfalar, setSayfalar] = useState([])


  const form = useForm<z.infer<typeof TalepKisiSayfaEditSchema>>({
    resolver: zodResolver(TalepKisiSayfaEditSchema),
    defaultValues: {
      SayfaRoute: '',
      kisiAdi: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof TalepKisiSayfaEditSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      kisiSayfaEditPost(values).then((data) => {
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
      const sayfalar = await kisininSayfalar(value);
      setSayfalar(sayfalar);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  const onSayfaSelected = (value: string) => {
    // Find the yetki in kisiYetkiler array based on the value yetkiAdi
    const sayfa = sayfalar.find(sayfa => sayfa.sayfaRoute === value);
    const isPermitted = sayfa?.isPermitted;
    if (isPermitted === undefined) {
      return;
    }
    form.setValue('isPermitted', isPermitted);
    form.setValue('SayfaRoute', value);
  };

  const onFormError: SubmitErrorHandler<z.infer<typeof TalepKisiSayfaEditSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper headerLabel={'Kişi Sayfa Edit'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className='flex flex-col items-center justify-center'>
          <div className='grid grid-cols-2 gap-8'>
            <FormField control={form.control} name={'kisiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Kisi Adi</FormLabel>
                <FormControl>
                  <CustomCombobox onValueChange={(value) => { field.onChange(value); onValueChange(value) }} Options={kisilerOptions} placeholder={'Kişi Ara'} searchPlaceholder={'Kişi Ara...'} />
                </FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name={'SayfaRoute'} render={({ field }) => (
              <FormItem>
                <FormLabel>Sayfa Adi</FormLabel>
                <CustomCombobox onValueChange={(value) => { field.onChange(); onSayfaSelected(value) }} Options={sayfalarOptions} placeholder={'Sayfa Ara'} searchPlaceholder={'Sayfa Ara...'} disabled={isPending || !isKisiSelected} />
              </FormItem>
            )} />

            <FormField control={form.control} name="isPermitted" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>İzin</FormLabel>
                  <FormDescription>
                    Kişi bu sayfayı kullanabilir mi?
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
