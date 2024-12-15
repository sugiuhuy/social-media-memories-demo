import { ConversationProps, MessageProps } from "~/types/chat-interfaces";
import { AuthProps, UserProps } from "~/types/user-interfaces";
import { getRandomContents } from "./content-data";
import { generateRandomImage } from "./file-images";
import { generateUsers } from "./user-data";

export const generateChatConversations = (count: number) => {
  const conversations: ConversationProps[] = [];
  for (let i = 0; i < count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const ramdomCountUnread = Math.floor(Math.random() * 40) + 1;
    const randomFileIndex = Math.floor(Math.random() * 40);

    const users = generateUsers() as AuthProps[];
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex] as UserProps;

    conversations.push({
      _id: `${Date.now()}-${i}`,
      members: [user],
      message: {
        _id: `${Date.now()}-${i}`,
        sender: user,
        media: randomFileIndex === 0 ? null : { fileType: "image" },
        getText: getRandomContents("short").getText,
        isRead: false,
        createdAt: date,
        isOwnMessage: false,
      },
      countUnread: ramdomCountUnread,
      haveMessages: true,
      createdAt: date,
    });
  }

  return conversations;
};

export const generateChatMessages = (props: { count: number; includes: string[] }) => {
  const messages: MessageProps[] = [];
  for (let i = 0; i < props.count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const randomFileIndex = Math.floor(Math.random() * 40);

    const users = generateUsers() as AuthProps[];
    const randomUserIndex = Math.floor(Math.random() * props.includes.length);
    const user = users.find((user) => user._id === props.includes[randomUserIndex])! as UserProps;

    messages.push({
      _id: `${Date.now()}-${i}`,
      sender: user,
      media: randomFileIndex === 0 ? undefined : { _id: `${Date.now()}-${i}`, fileType: "image", src: generateRandomImage() },
      getHtml: getRandomContents("short").getHtml,
      getText: getRandomContents("short").getText,
      isRead: false,
      createdAt: date,
      isOwnMessage: false,
    });
  }

  return messages;
};
