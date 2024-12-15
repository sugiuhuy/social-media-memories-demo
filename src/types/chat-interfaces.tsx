import { UserProps } from "~/types/user-interfaces";

export type ConversationProps = {
  _id: string;
  members: UserProps[];
  message: {
    _id: string;
    sender: UserProps;
    media?: { fileType: string } | null;
    getText?: string;
    isRead: boolean;
    isOwnMessage: boolean;
    createdAt: Date;
  } | null;
  countUnread: number;
  haveMessages: boolean;
  createdAt: Date;
};

export type MessageProps = {
  _id: string;
  sender: UserProps;
  getHtml?: string;
  getText?: string;
  media?: { _id: string; fileType: string; src: string };
  isRead: boolean;
  isOwnMessage: boolean;
  createdAt: Date;
};
