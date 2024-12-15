import { UserProps } from "~/types/user-interfaces";

export type GroupingArticleProps = {
  _id: string | null;
  groupName: string | null;
  articles: { _id: string; title: string }[];
};

export type ArticleProps = {
  _id: string;
  group: string;
  author: UserProps;
  title: string;
  content: string;
  isBlog: boolean;
  showHelpful: boolean;
  helpful: {
    total: number;
    countIsHelpful: number;
    countIsNotHelpful: number;
    isHelpfully: boolean;
    notHelpfully: boolean;
  };
  countArticleHelpfuls: number;
  createdAt: Date;
};

export type BlogProps = {
  _id: string;
  group: string;
  author: UserProps;
  title: string;
  content: string;
  createdAt: Date;
};

export type AppearUrlProps = {
  title: string;
  url: string;
  appearAt: {
    registerForm: boolean;
    footerNavigation: boolean;
    clientSetting: boolean;
  };
};
