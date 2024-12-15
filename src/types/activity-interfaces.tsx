import { UserProps } from "~/types/user-interfaces";

export type ActivityProps = {
  _id: string;
  sender: UserProps;
  category: "user" | "post";
  url: string;
  message: string;
  isRead: boolean;
  isRequestFollowing: boolean;
  createdAt: Date;
};
