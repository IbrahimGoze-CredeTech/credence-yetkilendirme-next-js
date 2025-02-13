/* eslint-disable no-duplicate-imports */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { type SubmitErrorHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { rolYetkiPost } from '@/actions/rol-post';
import { rolunYetkileri } from '@/actions/rol-yetki';
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
import { EylemTuruEnum, eylemTuruStringArray } from '@/modals/eylemTuru';
import { rolYetkiSchema, type talepRolSayfaAtamaSchema } from '@/schemas';
// import { rolYetkiSchema } from '@/schemas';


type RolYetkiType = { yetkiAdi: string, eylemTuruId: number };

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

  const [rolYetkiler, setRolYetkiler] = useState<RolYetkiType[]>([]);

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


  const form = useForm<z.infer<typeof rolYetkiSchema>>({
    resolver: zodResolver(rolYetkiSchema),
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

  const onSubmit = (values: z.infer<typeof rolYetkiSchema>) => {
    setError('');
    setSuccess('');

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
              }}>Iptal</ToastAction>
            )
          });
        }

      }).catch(() => setError('Something went wrong!'));
    })
  }

  const onValueChange = (value: string) => {

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

  const onFormError: SubmitErrorHandler<z.infer<typeof talepRolSayfaAtamaSchema>> = (e) => {
    console.error(e)
  }

  return (
    <CardWrapper backButtonHref="/talep-ekran" backButtonLabel="Talepler Sayfasına Geri Don" headerLabel="Yetki Değiştirme">
      <Form {...form}>
        <form className='flex flex-col items-center justify-center' onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <div className='grid grid-cols-2 gap-8'>
            <FormField control={form.control} name="rolAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Rol Adi</FormLabel>
                <FormControl>
                  <CustomCombobox Options={rollerOptions} onValueChange={(value) => { field.onChange(value); onValueChange(value) }} placeholder="Rol Ara" searchPlaceholder="Rol Ara..." />
                </FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="yetkiAdi" render={({ field }) => (
              <FormItem>
                <FormLabel>Yetki Adi</FormLabel>
                <CustomCombobox Options={yetkilerOptions} disabled={isPending || !isKisiSelected} onValueChange={(value) => { field.onChange(value); onYetkiSelected(value) }} placeholder="Yetki Ara" searchPlaceholder="Yetki Ara..." />
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
          <Button className='w-[85%] mt-4' disabled={isPending} type='submit'>Rol Yetki Değiştirme Talebi Olustur</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
