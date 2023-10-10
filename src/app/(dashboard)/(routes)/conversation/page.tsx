'use client'

import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { formSchema } from "./constants";
import { Form, FormField, FormControl, FormItem } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Loader } from "@/app/components/loader";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "../../../libs/utils";
import { UserAvatar } from "@/app/components/user-avatar";
import { BotAvatar } from "@/app/components/bot-avatar";

// vissualize the messages array data for me, data take from openai
interface ChatCompletionRequestMessage {
    content: string;
    role: "user" | "bot";
}





const Conversation = () => {
    const router = useRouter();
    const proModel = useProModal();
 

    // const [messages, setMessages] = useState<[]>([]);
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-4xl font-bold">
                Welcome back, User !
            </div>
            {/* chat input  */}
            <div className="px-4 lg:px-8 mt-14 w-[70%] ">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="
                  rounded-2xl 
                  border 
                  w-full 
                  p-4 
                  px-3 
                  md:px-6 
                  focus-within:shadow-sm
                  grid
                  grid-cols-12
                  gap-2
                "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="text-lg border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button className="col-span-12 lg:col-span-2 w-full p-3 bg-orange-400 rounded-2xl" type="submit" disabled={isLoading} size="icon">
                                Start a chat !
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* the chat conversation part */}
                <div className="space-y-4 mt-4">
                    {isLoading && (
                         <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                         <Loader />
                       </div>
                    )}
                     {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
                </div>
                
            </div>
        </div>
    )
}

export default Conversation;
