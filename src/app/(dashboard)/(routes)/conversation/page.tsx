'use client'

import * as z from "zod";
import { MessageSquare, Send } from "lucide-react";
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
        <div className="flex flex-col justify-start items-center md:h-[1000px] w-full bg-[#efede6] rounded-2xl">
            <div className="text-4xl font-bold md:mt-9">
                Welcome back, User !
            </div>
            {/* chat input  */}
            <div className="px-4 lg:px-8 mt-7 w-[70%] ">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="
                  rounded-2xl 
                  border 
                  bg-white
                  shadow-xl
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

                            <Button className="flex gap-2 items-center col-span-12 lg:col-span-2 w-full p-3 bg-orange-400 rounded-2xl hover:scale-110 duration-150 transition hover:cursor-pointer" type="submit" disabled={isLoading} size="icon">
                                Start a chat <Send size={18}/>
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
                     {messageDemo.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex flex-row items-center  gap-x-8 rounded-lg ",
                  message.role === "user" ? "  justify-end" : "bg-white shadow-xl",
                )}
              >
                {message.role === "user" ? 
                ( <div className="flex flex-row items-center gap-6">
              <p className="text-lg text-gray-600 font-semibold">
                  {message.content}
                </p>
                    <UserAvatar /> 
                </div>
                ): 
                ( <div className="flex flex-row items-center gap-6">
                    <BotAvatar />
                     <p className="text-lg text-gray-600 font-semibold">
                  {message.content}
                </p>
                </div>
                ) }
                
               
              </div>
            ))}
                </div>
                
            </div>
        </div>
    )
}

export default Conversation;


const messageDemo = [
    {
        "content": "Hello, how are you?",
        "role": "user"
    },
    {
        "content": "I am doing great, What can i help you?",
        "role": "bot"

    },
    {
        "content": "So i have problem with my blossom ",
        "role": "user"
    },{
        "content":"What is the problem?",
        "role": "bot"

    },
    {
        "content":"My blossom's leaf have a lot of brown spot",
        "role": "user"

    }
]
