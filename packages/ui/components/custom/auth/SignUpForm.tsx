"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import {
  AlertTriangle,
  Check,
  EqualNotIcon,
  Loader2,
  LucideLogIn,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "sonner";
import debounce from "lodash/debounce";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  full_name: z.string().min(1, {
    message: "Full name is required.",
  }),
});

export default function SignInForm() {
  const [isCheckinhUser, setIsCheckingUser] = useState<boolean>(false);
  const [isUserNameAvailable, setIsUserNameAvailable] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      full_name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    // console.log(data);
    try {
      supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: "https://purepridepharma.com/dashboard",
          data: {
            full_name: data.full_name,
            username: data.username.toLowerCase().replace(/ /g, "-"),
          },
        },
      });
    } catch (err:any) {
      console.log(err);
      toast.error("Error signing up");
    }
  }
  const onUserNameChange = async (e: string) => {
    if (e.length > 0) {
      setIsCheckingUser(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", e.toLowerCase().replace(/ /g, "-"));
        // console.log(data);
        if (error) throw new Error(error.message);
        if (data && data.length > 0) {
          setIsUserNameAvailable(false);
        } else {
          setIsUserNameAvailable(true);
        }
      } catch (err:any) {
        toast.error("Error checking username");
      } finally {
        setIsCheckingUser(false);
      }
    } else {
      setIsUserNameAvailable(false);
    }
  };
  const debouncedOnUserNameChange = debounce(onUserNameChange, 500);

  return (
    <Form {...form}>
      <Alert className="my-7" variant="default">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You will be sent an email with a link to confirm your account.
        </AlertDescription>
      </Alert>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jhon Doe"
                  {...field}
                  type="text"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-1 items-center">
                  <Input
                    placeholder="@username"
                    {...field}
                    type="text"
                    onChange={(event) => {
                      debouncedOnUserNameChange(event.target.value);
                      field.onChange(event);
                    }}
                  />
                  <Button
                    type="button"
                    disabled={isCheckinhUser}
                    variant="ghost"
                    size={"icon"}
                  >
                    {isCheckinhUser ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isUserNameAvailable ? (
                      <Check className={`h-4 w-4`} />
                    ) : (
                      <EqualNotIcon className="h-4 w-4 opacity-50" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="submit"
              className="w-full flex gap-2"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span>SignUp</span>
              )}
              <LucideLogIn />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome To purepridepharma</AlertDialogTitle>
              <AlertDialogDescription>
                Please check your email to confirm your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
