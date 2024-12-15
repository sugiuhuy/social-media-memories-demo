import { imageEffectOptions } from "~/configurations/file";
import { PostMediaProps } from "~/types/post-interfaces";
import { UserProps } from "~/types/user-interfaces";
import { generateRandomImage } from "./file-images";
import { generateTaggedUsers } from "./user-data";

const generatePostMedia = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const maxNumber = 40;
  const media: PostMediaProps<{ taggedUsers: UserProps[] }>[] = [];

  while (media.length < randomNumber) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    if (!media.find((item) => item._id === `media_${randomNumber}`)) {
      const randomTaggedUsers = Math.floor(Math.random() * 7) + 1;
      const randomIndex = Math.floor(Math.random() * imageEffectOptions.length);

      media.push({
        _id: `media_${randomNumber}`,
        fileType: "image",
        src: generateRandomImage(),
        imageEffect: imageEffectOptions[randomIndex],
        imageRatio: "cover",
        taggedUsers: generateTaggedUsers(randomTaggedUsers),
        isCencored: false,
      });
    }
  }

  return media;
};

export default generatePostMedia;
