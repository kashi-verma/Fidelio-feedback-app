"use client";

import { ApiResponse } from "@/src/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import * as z from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/src/schemas/signUpSchema";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debouncedUsername] = useDebounceValue(username, 500);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!debouncedUsername) {
        setUsernameMessage("");
        return;
      }

      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${debouncedUsername}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Sign Up Failed",
        description:
          axiosError.response?.data.message ??
          "There was a problem with your sign-up. Please try again.",
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] overflow-hidden px-4">
      {/* Floating Blobs */}
      <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px] opacity-20 z-0 animate-pulse" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[160px] opacity-20 z-0 animate-float" />

      {/* Form Card */}
      <div className="z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text mb-2">
            Join Fidelio
          </h1>
          <p className="text-gray-300 text-sm">
            Sign up to start your anonymous adventure.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                      className="bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500 pr-10"
                      placeholder="Create a unique handle"
                    />
                    {isCheckingUsername && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white animate-spin" />
                    )}
                  </div>
                  {usernameMessage && !isCheckingUsername && (
                    <p
                      className={`text-sm mt-1 ${
                        usernameMessage === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <Input
                    {...field}
                    className="bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                  />
                  <p className="text-sm text-gray-400">
                    We’ll send a verification code.
                  </p>
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
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-cyan-300 hover:text-purple-400 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
