'use client'

import * as z from "zod";
import { MessageSquare, Send, User } from "lucide-react";
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
import  {ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, OpenAIApi}  from "openai";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";







// vissualize the messages array data for me, data take from openai
// interface ChatCompletionRequestMessage {
//     content: string;
//     role: "user" | "bot";
// }





const Conversation = () => {
    const router = useRouter();
    const {data:session} = useSession();



    const playGroundText = "You are a person with extensive knowledge about crops - someone considered a Crop consultant. Get the following information about me with optimal content and ensure the plants are disease-free with all the knowledge a Crop consultant has, no reply  irrelevant things  if not necessary: I am growing {plant name}, the plant has been growing {the age of the plant } months, the status the plant is in {the status of the plant}, has the fruit quality {quality fruit of the plant}, the tree is reaching its height {the height of the tree }, it is now {the season}, The climate is {climate condition}./n- If the plants are in bad condition or infected, please respond to me :{the name of disease on my plant after predicted (only response with 1 line) }and next row only with 3-4 lists(just label number by order in each list. no need open and ending sentences ) . Then  If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list ) /n- If the plant's condition is healthy, just response: Continue to care for the plant as usual. /n- If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list ) /n- If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list )"

   
 

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
        // console.log(values);
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            // const completion = await openai.chat.completions.create({
            //     messages: [{ role: "system", content: "You are a helpful assistant." }],
            //     model: "gpt-3.5-turbo",
            //   });

            const assitant: ChatCompletionRequestMessage = { role: "assistant", content: playGroundText };
            
            const newMessages = [...messages, userMessage, assitant];
         const response = await axios.post('/api/conversation',{messages: newMessages});
         setMessages((current)=>[...current, userMessage, response.data]);
         form.reset();
        } catch (error:any) {
            if (error?.response?.status === 403) {
                toast.error("You are not authorized to perform this action.");
              } else {
                toast.error("Something went wrong.");
              }
        }
        finally{
            router.refresh();
        }
    }

    if (!session) {
        router.replace("/authen");
    };

    return (
        <div className="flex flex-col justify-start items-center md:h-[1000px] w-full  rounded-2xl">
            <div className="text-4xl font-bold md:mt-9">
                Welcome back, {session?.user?.name} !
            </div>
            <div className="mt-6 lg:px-8">
                <div>
                    <Form {...form}>
                       <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg 
                        border
                        w-full 
                        p-4 
                        m 
                        md:px-6 
                        focus-within:shadow-sm
                        flex flex-row
                        gap-2
                        "
                       >
                         <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 text-xl font-medium md:w-[1000px] outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How do I calculate the radius of a circle?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button  className=" md:w-[200px] bg-black text-white" type="submit" disabled={isLoading} size="icon">Generate</Button>

                       </form>
                    </Form>

                </div>

{/* conversation field */}
<div className="space-y-4 mt-4">
    {isLoading && (
        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            ....loading This is icon for loading
        </div>
    )}
    {messages.map((message)=>(
        <div key={message.content}
          className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200", message.role === "user" ? "bg-white border border-black/10" : "bg-green-200")}
        >
            {message.role === "user"? <UserAvatar /> : <BotAvatar />}

<p className="text-xl font-medium"> {message.content}</p>
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

