import { ActivityProps } from "~/types/activity-interfaces";
import { AuthProps } from "~/types/user-interfaces";
import { getRandomContents } from "./content-data";
import { generateUsers } from "./user-data";

const generateNotifications = (props: { count: number; exclude: string }) => {
  const notifications: ActivityProps[] = [];
  for (let i = 0; i < props.count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const users = generateUsers() as AuthProps[];
    users.filter((u) => u._id !== props.exclude);

    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];

    const types = ["post", "user"];
    const randomIndexType = Math.floor(Math.random() * types.length);

    notifications.push({
      _id: `${Date.now()}-${i}`,
      sender: {
        _id: user._id,
        avatar: user.avatar,
        display: user.display,
        isVerified: user.isVerified,
        name: user.name,
        username: user.username,
      },
      url: "/",
      category: types[randomIndexType] as "post" | "user",
      message: getRandomContents("short").getText,
      isRead: false,
      isRequestFollowing: false,
      createdAt: date,
    });
  }

  return notifications;
};

export default generateNotifications;
