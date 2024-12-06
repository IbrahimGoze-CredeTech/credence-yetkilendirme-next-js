"use client";

// import { signIn } from "next-auth/react";
import { useState, useEffect, useTransition } from "react";
// import { useRouter } from "next/navigation";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      // setUsername(savedUsername);
      // setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: '',
      password: '',
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values).then((data) => {
        if (!data) {
          setError("Something went wrong! Please try again.");
          return;
        }
        if (data.error) {
          form.reset();
          setError(data.error);
        } else if (data.success) {
          form.reset();
          setSuccess(data.success);
          window.location.replace('/');
        }
      }).catch((e) => {
        setError('Something went wrong! ' + e.message);
      });
    })
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResetPassword(false);
    setEmail("");
    alert("E-posta adresinize yeni bir şifre belirlemek için bir bağlantı gönderildi.");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="p-6 rounded-lg shadow-lg bg-white w-96">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-blue-600">Giriş Yap</CardTitle>
            <p className="text-center text-gray-600 mt-1">Hesabınıza erişim sağlamak için giriş yapın</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-400-500 text-center">{success}</p>} */}
                <FormField control={form.control} name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input {...field}
                          disabled={isPending}
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input {...field}
                          type="password"
                          // id="username"
                          // value={username}
                          disabled={isPending}
                          // onChange={(e) => setUsername(e.target.value)}
                          // required
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
                    Beni Hatırla
                  </label>
                </div>
                <CardFooter className="flex flex-col items-center">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Giriş Yap
                  </Button>
                  <a
                    href="#"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Şifremi Unuttum?
                  </a>
                </CardFooter>
              </form>
            </Form>

            {showResetPassword && (
              <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
                <h2 className="text-lg font-semibold mb-2">Şifreyi Sıfırla</h2>
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                    E-posta
                  </label>
                  <Input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setShowResetPassword(false)}
                    className="bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    İptal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Gönder
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <a href="#" onClick={() => setShowTerms(true)} className="text-blue-600 hover:underline">Kullanıcı Sözleşmesi</a>
                <span className="mx-2">|</span>
                <a href="#" onClick={() => setShowPrivacy(true)} className="text-blue-600 hover:underline">Gizlilik Politikası</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-2">Kullanıcı Sözleşmesi</h2>
            <p>
              Bu kullanıcı sözleşmesi, Credence ile kullanıcı arasında, Credence Yetkilendirme Paneli kullanımına ilişkin şartları belirlemektedir.
            </p>
            <p>
              Kullanıcı, uygulamayı kullanmaya başlamadan önce bu sözleşmeyi okuduğunu ve kabul ettiğini beyan eder.
            </p>
            <Button onClick={() => setShowTerms(false)} className="mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Kapat
            </Button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-2">Gizlilik Politikası</h2>
            <p>
              Credence, kullanıcı bilgilerinin gizliliğini koruma konusunda taahhütte bulunmaktadır. Bu gizlilik politikası, kullanıcı bilgilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
            <p>
              Kullanıcı, uygulamayı kullanarak bu gizlilik politikasını kabul etmiş sayılır.
            </p>
            <Button onClick={() => setShowPrivacy(false)} className="mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Kapat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
