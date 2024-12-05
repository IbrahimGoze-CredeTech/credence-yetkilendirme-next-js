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
import { RolYetkiSchema, TalepRolSayfaAtamaSchema } from '@/schemas';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import CustomCombobox from '@/components/custom-combobox';
import { CustomDatePicker } from '@/components/custom-date-picker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EylemTuruEnum, eylemTuruStringArray } from '@/modals/eylemTuru';
import { rolunYetkileri } from '@/actions/rol-yetki';
import { rolYetkiPost } from '@/actions/rol-post';


type RolYetki = { yetkiAdi: string, eylemTuruId: number };

export default function RolYetkiForm() {
  const staticTablesContext = useStaticTablesContext();

  const yetkilerOptions: Option[] = staticTablesContext.yetkiler.map((yetki) =>
    ({ label: yetki.yetkiAdi, value: yetki.yetkiAdi })) || [];

  const kisilerOptions: Option[] = staticTablesContext.kisiler.map((kisi) =>
    ({ label: kisi.kisiAdi + " " + kisi.kisiSoyadi, value: kisi.kisiAdi + " " + kisi.kisiSoyadi })) || [];
  const rollerOptions: Option[] = staticTablesContext.roller.map((rol) => ({
    label: rol.rolAdi, // Roller sadece ad içeriyor
    value: rol.rolAdi,
  })) || [];

  const [rolYetkiler, setRolYetkiler] = useState<RolYetki[]>([]);

  // const [sayfalar, setSayfalar] = useState<string[]>([]);
  // const sayfalarOptions = sayfalar.map((sayfa) => ({
  //   label: sayfa,
  //   value: sayfa,
  // })) || [];
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("");
  const [isBaslangicOpen, setIsBaslangicOpen] = useState(false);
  const [isBitisOpen, setIsBitisOpen] = useState(false);
  const [isKisiSelected, setIsKisiSelected] = useState(false);


  const form = useForm<z.infer<typeof RolYetkiSchema>>({
    resolver: zodResolver(RolYetkiSchema),
    defaultValues: {
      rolAdi: '',
      yetkiAdi: '',
      eylemTuru: '',
      baslamaTarihi: new Date(),
      bitisTarihi: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ciftImza: false,
      ekstraImza: [],
    },
  });

  const onSubmit = (values: z.infer<typeof RolYetkiSchema>) => {
    setError('');
    setSuccess('');
    // console.log('values: ', values);

    startTransition(() => {
      rolYetkiPost(values).then((data) => {
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
    console.log(value);

    startTransition(async () => {
      // const sayfalar = await RolAtanabilirSayfalar(value);
      const yetkiler = await rolunYetkileri(value);
      setRolYetkiler(yetkiler);

      // setSayfalar(sayfalar);
      setIsKisiSelected(true); // Update boolean based on whether there's a value
    });
  };

  const onYetkiSelected = (value: string) => {
    // Find the yetki in kisiYetkiler array based on the value yetkiAdi
    const yetki = rolYetkiler.find(yetki => yetki.yetkiAdi === value);
    const eylemlerTuruId = yetki?.eylemTuruId;

    if (eylemlerTuruId) {
      // Convert eylemlerTuruId to the string representation from EylemTuruEnum
      const eylemTuruString = EylemTuruEnum[eylemlerTuruId];

      if (eylemTuruString) {
        form.setValue('eylemTuru', eylemTuruString); // Update the form's eylemTuru field
        return;
      }
    }
    form.setValue('eylemTuru', ''); // Update the form's eylemTuru field
  }

  const onFormError: SubmitErrorHandler<z.infer<typeof TalepRolSayfaAtamaSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper headerLabel={'Yetki Değiştirme'} backButtonLabel={'Talepler Sayfasına Geri Don'} backButtonHref={'/talep-ekran'}>
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

            <FormField control={form.control} name={'yetkiAdi'} render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Adi</FormLabel>
                <CustomCombobox onValueChange={(value) => { field.onChange(value); onYetkiSelected(value) }} Options={yetkilerOptions} placeholder={'Yetki Ara'} searchPlaceholder={'Yetki Ara...'} disabled={isPending || !isKisiSelected} />
              </FormItem>
            )} />
            <FormField control={form.control} name='eylemTuru' render={({ field }) => (
              <FormItem>
                <FormLabel>Eylem Türü</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending || !isKisiSelected} value={field.value}>
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
          <Button type='submit' className='w-[85%] mt-4' disabled={isPending}>Rol Yetki Değiştirme Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}