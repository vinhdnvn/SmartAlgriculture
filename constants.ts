import { Code, ImageIcon, MessageSquare, Music, VideoIcon, Leaf } from "lucide-react";
import { ListChecks, LogOut, ScrollText } from "lucide-react";
export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'EcoBots',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   href: '/music',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  {
    label: 'Detect Image',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/detect',
  },
  {
    label: 'Tracking',
    icon: Leaf,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/tracking',
  },
  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  //   href: '/code',
  // },
];


export const  routes = [
  {
    label: 'Chatbot',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-sky-500"
  },
  {
    label: 'Tasks',
    icon: ListChecks,
    href: '/',
    color: "text-violet-500",
  },
  {
    label: 'Diary',
    icon: ScrollText,
    color: "text-pink-700",
    href: '/diary',
  },
  {
    label: 'Logout',
    icon: LogOut,
    color: "text-orange-700",
    href: '/home',
  },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   color: "text-emerald-500",
  //   href: '/music',
  // },
  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   href: '/code',
  // },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/settings',
  // },
]