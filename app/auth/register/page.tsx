"use client";

// import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { login } from "@/actions/login";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
    }
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
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
            window.location.replace("/");
          }
        })
        .catch((e) => {
          setError("Something went wrong! " + e.message);
        });
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="p-6 rounded-lg shadow-lg bg-white w-96">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-blue-600">
              Giriş Yap
            </CardTitle>
            <p className="text-center text-gray-600 mt-1">
              Hesabınıza erişim sağlamak için giriş yapın
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-400-500 text-center">{success}</p>} */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
                          disabled={isPending}
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <CardFooter className="flex flex-col items-center">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    className="bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={isPending}
                    type="submit"
                  >
                    Giriş Yap
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
