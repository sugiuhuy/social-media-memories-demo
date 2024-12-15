export type UserProps<P extends Record<string, any> = {}> = P & {
  _id: string;
  display: { initial: string; color: string };
  avatar: string | null;
  username: string;
  name: string;
  isVerified: boolean;
};

export type AuthProps = UserProps<{
  bio: string;
  allowMention: { private: boolean; on: boolean; off: boolean };
  allowTagged: { private: boolean; on: boolean; off: boolean };
  pushNotifications: {
    postReaction: { private: boolean; on: boolean; off: boolean };
    postComment: { private: boolean; on: boolean; off: boolean };
    votedComment: { private: boolean; on: boolean; off: boolean };
    tagged: { private: boolean; on: boolean; off: boolean };
    mentioned: { private: boolean; on: boolean; off: boolean };
    isRequestFollowing: boolean;
  };
  countChangeUsername: number;
  isAdmin: boolean;
  isPrivate: boolean;
  showSuggestions: boolean;
  countUnreadNotifications: number;
  countUnreadChatMessages: number;
  role: "owner" | "moderator" | "journalist" | "none";
  haveRequestVerifiedAccount: boolean;
  token: string;
  exp: number;
}>;

export type ProfileProps = UserProps<{
  bio: string;
  createdAt: Date;
  countFollowing: number;
  countFollowers: number;
  countPosts: number;
  isBlock: boolean;
  isFollow: boolean;
  haveRequestFollow: boolean;
  isMute: boolean;
  isPersonalize: boolean;
  isRequestFollowing: boolean;
  showSuggestions: boolean;
  suggestions: UserProps<{ isFollow: boolean; haveRequestFollow: boolean }>[];
}>;

export type CollectionProps<P extends Record<string, any> = {}> = P & {
  _id: string;
  src: string;
  speedAnimation: number;
  unicode: string;
  allowUsedFor: { everyone: boolean; followers: boolean };
  countUsed: number;
};

export type UserRequestProps = {
  _id: string;
  user: UserProps;
  title: string;
  description: string;
  type: "activation" | "reset_password" | "verifying_account";
};
