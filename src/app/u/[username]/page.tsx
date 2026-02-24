"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "@/src/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/src/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/src/schemas/messageSchema";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-500 text-transparent bg-clip-text">
            Send a Message
          </h1>
          <p className="text-gray-400 text-base">
            to <span className="text-white font-semibold">@{username}</span> — completely anonymous
          </p>
        </div>

        {/* Message Form Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                      Your Anonymous Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here..."
                        className="resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isLoading ? (
                  <Button
                    disabled
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-2 rounded-xl"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  >
                    Send It
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Suggested Messages Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Suggested Messages</h3>
              <p className="text-sm text-gray-400 mt-1">Click on any message to select it</p>
            </div>
            <Button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-all duration-300"
            >
              {isSuggestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Suggest Messages"
              )}
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            {error ? (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error.message}
              </p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <button
                  key={index}
                  className="text-left w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-200 cursor-pointer"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </button>
              ))
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-3 pt-4">
          <Separator className="bg-white/10" />
          <p className="text-gray-400 text-sm pt-4">Want your own anonymous message board?</p>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 mt-2">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
