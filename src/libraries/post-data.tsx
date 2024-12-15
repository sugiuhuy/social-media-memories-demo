import { CommentProps, PostProps } from "~/types/post-interfaces";
import { getRandomContents } from "./content-data";
import { generateRandomReaction } from "./file-images";
import generatePostMedia from "./post-media-data";
import { generateContentAuthor, generateRandomContentAuthor } from "./user-data";
import { userNames } from "./user-name-data";

export const generatePosts = (props: { count: number; author?: string }) => {
  const posts: PostProps[] = [];
  const today = new Date();

  for (let i = 1; i <= props.count; i++) {
    const randomCountComment = Math.floor(Math.random() * 50) + 1;
    const randomCountReaction = Math.floor(Math.random() * userNames.length) + 1;

    const date = new Date(today);
    date.setDate(today.getDate() - i);

    posts.push({
      _id: `${Date.now()}-${i}`,
      author: props.author ? generateContentAuthor(props.author)! : generateRandomContentAuthor(),
      getHtml: getRandomContents("long").getHtml,
      getText: getRandomContents("long").getText,
      media: generatePostMedia(),
      collections: [
        {
          _id: "collection_1",
          src: generateRandomReaction(),
          speedAnimation: 800,
          unicode: "sparklink",
          allowUsedFor: {
            everyone: true,
            followers: false,
          },
          countUsed: randomCountReaction,
          isUsed: false,
        },
      ],
      countComments: randomCountComment,
      countReports: 0,
      isActiveComment: true,
      isActiveReaction: true,
      isAds: false,
      isSaved: false,
      createdAt: date,
    });
  }

  return posts;
};

export const generateComments = (count: number) => {
  const comments: CommentProps<{ replyingAt: CommentProps | null }>[] = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const randomCountVoteUp = Math.floor(Math.random() * userNames.length) + 1;
    const randomCountVoteDown = Math.floor(Math.random() * userNames.length) + 1;
    const randomCommentIndex = Math.floor(Math.random() * comments.length);

    const date = new Date(today);
    date.setDate(today.getDate() - i);

    comments.push({
      _id: `${Date.now()}-${i}`,
      replyingAt: randomCommentIndex === 0 ? null : comments[randomCommentIndex],
      author: generateRandomContentAuthor(),
      getHtml: getRandomContents("medium").getHtml,
      getText: getRandomContents("medium").getText,
      vote: {
        up: { count: randomCountVoteUp, isVoted: false },
        down: { count: randomCountVoteDown, isVoted: false },
      },
      createdAt: date,
    });
  }

  return comments;
};
