"use client";

import { useState, useTransition } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
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
    <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-sky-200 to-azure-radiance-500">
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
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-150"
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

                <CardFooter className="flex flex-col items-center m-4 p-4">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition duration-200"
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
