"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/components/ui/use-toast";
import { signInSchema } from "@/src/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url && !result?.error) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] overflow-hidden">
      {/* Glowing Blobs */}
      <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px] opacity-25 z-0" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[160px] opacity-20 z-0" />

      <div className="z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-sm">
            Sign in to continue your anonymous journey.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email / Username</FormLabel>
                  <Input
                    {...field}
                    className="bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email or username"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    className="bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition transform"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Not a member yet?{" "}
          <Link
            href="/sign-up"
            className="text-cyan-300 hover:text-purple-400 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
