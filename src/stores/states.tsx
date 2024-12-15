import { ActivityProps } from "~/types/activity-interfaces";
import { AppearUrlProps, ArticleProps, BlogProps, GroupingArticleProps } from "~/types/article-interfaces";
import { ConversationProps, MessageProps } from "~/types/chat-interfaces";
import { CommentProps, PostProps } from "~/types/post-interfaces";
import { AuthProps, CollectionProps, ProfileProps, UserProps, UserRequestProps } from "~/types/user-interfaces";

export type initialStateProps = {
  entries: string[];
  theme: "dark" | "light" | "auto";
  toasts: { id: number; status: "success" | "info" | "danger" | "warning"; message: string }[];
  appearUrls: AppearUrlProps[];
  groupingArticles: GroupingArticleProps[];
  article: ArticleProps | null;
  blogs: BlogProps[];
  userRequest: UserRequestProps | null;
  auth: AuthProps | null;
  userSuggestions: UserProps<{ isFollow: boolean; haveRequestFollow: boolean }>[];
  blockAccounts: UserProps<{ isBlock: boolean }>[];
  muteAccounts: UserProps<{ isMute: boolean }>[];
  personalizeAccounts: UserProps<{ isPersonalize: boolean }>[];
  collections: CollectionProps[];
  collectionDetails: CollectionProps | null;
  post: PostProps | null;
  posts: PostProps[];
  postComments: CommentProps<{ replyingAt: CommentProps | null }>[];
  taggedUsers: UserProps<{ isTagged: boolean }>[];
  searchUsers: UserProps<{ isFollow: boolean; haveRequestFollow: boolean }>[];
  activities: ActivityProps[];
  chatConversation: ConversationProps | null;
  chatConversations: ConversationProps[];
  chatMessages: MessageProps[];
  profile: ProfileProps | null;
};

export const initialState: initialStateProps = {
  entries: [],
  theme: localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")!) : "auto",
  toasts: [],
  appearUrls: [],
  groupingArticles: [],
  article: null,
  blogs: [],
  userRequest: null,
  auth: null,
  userSuggestions: [],
  blockAccounts: [],
  muteAccounts: [],
  personalizeAccounts: [],
  collections: [],
  collectionDetails: null,
  post: null,
  posts: [],
  postComments: [],
  taggedUsers: [],
  searchUsers: [],
  activities: [],
  chatConversation: null,
  chatConversations: [],
  chatMessages: [],
  profile: null,
};
