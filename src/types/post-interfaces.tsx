import { UserProps, CollectionProps } from "~/types/user-interfaces";

export type AuthorProps = UserProps<{
  bio: string;
  isBlock: boolean;
  isFollow: boolean;
  haveRequestFollow: boolean;
  isMute: boolean;
  countFollowing: number;
  countFollowers: number;
  countPosts: number;
  createdAt: Date;
}>;

export type PostProps = {
  _id: string;
  author: AuthorProps;
  getHtml: string;
  getText: string;
  media: PostMediaProps<{ taggedUsers: UserProps[] }>[];
  collections: CollectionProps<{ isUsed: boolean }>[];
  countComments: number;
  countReports: number;
  isActiveComment: boolean;
  isActiveReaction: boolean;
  isAds: boolean;
  isSaved: boolean;
  createdAt: Date;
};

export type PostMediaProps<P extends Record<string, any> = {}> = P & {
  _id: string;
  fileType: string;
  src: string;
  imageEffect: string;
  imageRatio: string;
  isCencored: boolean;
};

export type CommentProps<P extends Record<string, any> = {}> = P & {
  _id: string;
  author: AuthorProps;
  getHtml: string;
  getText: string;
  vote: {
    up: { count: number; isVoted: boolean };
    down: { count: number; isVoted: boolean };
  };
  createdAt: Date;
};

export type AdsPostProps = {
  _id: string;
  author: UserProps;
  media: {
    _id: string;
    fileType: string;
    src: string;
    imageEffect: string;
    imageRatio: string;
    isCencored: boolean;
  }[];
  getText: string;
  isAds: boolean;
  createdAt: Date;
  isExpired: boolean;
  url: string;
  campaign: "application" | "shop" | "trafic";
};

export type HastagProps = {
  _id: string;
  name: string;
  count: number;
  createdAt: Date;
};
