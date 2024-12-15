import { AuthorProps } from "~/types/post-interfaces";
import { AuthProps, ProfileProps, UserProps } from "~/types/user-interfaces";
import generateColor from "~/utilities/generate-color";
import { generateRandomAvatar } from "./file-images";
import { getRandomBio } from "./user-bio-data";
import { userNames } from "./user-name-data";

export const generateUsers = (count?: number) => {
  const users: AuthProps[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const randomCountUnreadNotifications = Math.floor(Math.random() * 100) + 1;
    const randomCountUnreadMessages = Math.floor(Math.random() * 200) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      isVerified: randomNumber > Math.floor(11 / 2),
      bio: getRandomBio(),
      allowMention: { private: false, on: true, off: false },
      allowTagged: { private: false, on: true, off: false },
      pushNotifications: {
        postReaction: { private: false, on: true, off: false },
        postComment: { private: false, on: true, off: false },
        votedComment: { private: false, on: true, off: false },
        tagged: { private: false, on: true, off: false },
        mentioned: { private: false, on: true, off: false },
        isRequestFollowing: false,
      },
      countChangeUsername: 0,
      isAdmin: false,
      isPrivate: false,
      showSuggestions: false,
      countUnreadChatMessages: randomCountUnreadNotifications,
      countUnreadNotifications: randomCountUnreadMessages,
      token: "token",
      exp: 0,
      haveRequestVerifiedAccount: false,
      role: "none",
    });
  }

  return count ? users[count] : users;
};

export const generateTaggedUsers = (count: number) => {
  const users: UserProps<{ isTagged: boolean }>[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      isVerified: randomNumber > Math.floor(11 / 2),
      isTagged: false,
    });
  }

  const shuffledUsers = users.sort(() => 0.5 - Math.random());
  return shuffledUsers.slice(0, count);
};

export const generateRandomContentAuthor = (): AuthorProps => {
  const users = generateUsers() as AuthProps[];
  const randomIndex = Math.floor(Math.random() * users.length);

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100) + 1;

  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - randomIndex);

  return {
    _id: users[randomIndex]._id,
    name: users[randomIndex].name,
    avatar: users[randomIndex].avatar,
    username: users[randomIndex].username,
    bio: users[randomIndex].bio,
    countFollowers: randomCountFollowing,
    countFollowing: randomCountFollowers,
    countPosts: randomCountPosts,
    createdAt: date,
    display: users[randomIndex].display,
    isVerified: users[randomIndex].isVerified,
    isBlock: false,
    isFollow: false,
    isMute: false,
    haveRequestFollow: false,
  };
};

export const generateContentAuthor = (_id: string): AuthorProps | null => {
  const users = generateUsers() as AuthProps[];
  const index = users.findIndex((u) => u._id === _id);
  if (index === -1) return null;

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100) + 1;

  return {
    _id: users[index]._id,
    name: users[index].name,
    avatar: users[index].avatar,
    username: users[index].username,
    bio: users[index].bio,
    countFollowers: randomCountFollowing,
    countFollowing: randomCountFollowers,
    countPosts: randomCountPosts,
    createdAt: new Date(),
    display: users[index].display,
    isVerified: users[index].isVerified,
    isBlock: false,
    isFollow: false,
    isMute: false,
    haveRequestFollow: false,
  };
};

export const generateSearchUsers = (props: {
  count: number;
  isAction?: boolean;
  haveRequestFollow?: boolean;
  exclude?: string;
}) => {
  const users: UserProps<{
    isBlock: boolean;
    isFollow: boolean;
    isMute: boolean;
    isPersonalize: boolean;
    haveRequestFollow: boolean;
  }>[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString) || users.find((user: any) => user._id === props.exclude)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      isVerified: randomNumber > Math.floor(11 / 2),
      isBlock: props.isAction!,
      isFollow: props.isAction!,
      isMute: props.isAction!,
      isPersonalize: props.isAction!,
      haveRequestFollow: props.haveRequestFollow!,
    });
  }

  const shuffledUsers = users.sort(() => 0.5 - Math.random());
  return shuffledUsers.slice(0, props.count);
};

export const generateProfile = (props: { username: string; countSuggestions: number }): ProfileProps | null => {
  const users = generateUsers() as AuthProps[];
  const index = users.findIndex((u) => u.username === props.username);
  if (index === -1) return null;

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100);

  const randomIndex = Math.floor(Math.random() * users.length);
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - randomIndex);

  return {
    _id: users[index]._id,
    display: users[randomIndex].display,
    name: users[index].name,
    avatar: users[index].avatar,
    username: users[index].username,
    bio: users[index].bio,
    isVerified: users[index].isVerified,
    createdAt: date,
    countFollowers: randomCountFollowing,
    countFollowing: randomCountFollowers,
    countPosts: randomCountPosts,
    isBlock: false,
    isFollow: false,
    isMute: false,
    isPersonalize: false,
    isRequestFollowing: false,
    haveRequestFollow: false,
    showSuggestions: true,
    suggestions: generateSearchUsers({
      count: props.countSuggestions,
      isAction: false,
      haveRequestFollow: false,
      exclude: users[index]._id,
    }),
  };
};
