import avatarOne from "~/assets/images/avatar/1.jpg";
import avatarTwo from "~/assets/images/avatar/2.jpg";
import avatarThree from "~/assets/images/avatar/3.jpg";
import avatarFour from "~/assets/images/avatar/4.jpg";
import avatarFive from "~/assets/images/avatar/5.jpg";
import avatarSix from "~/assets/images/avatar/6.jpg";
import avatarSeven from "~/assets/images/avatar/7.jpg";
import avatarEight from "~/assets/images/avatar/8.jpg";
import avatarNine from "~/assets/images/avatar/9.jpg";
import avatarTen from "~/assets/images/avatar/10.jpg";
import imageOne from "~/assets/images/pictures/1.jpg";
import imageTwo from "~/assets/images/pictures/2.jpg";
import imageThree from "~/assets/images/pictures/3.jpg";
import imageFour from "~/assets/images/pictures/4.jpg";
import imageFive from "~/assets/images/pictures/5.jpg";
import imageSix from "~/assets/images/pictures/6.jpg";
import imageSeven from "~/assets/images/pictures/7.jpg";
import imageEight from "~/assets/images/pictures/8.jpg";
import imageNine from "~/assets/images/pictures/9.jpg";
import imageTen from "~/assets/images/pictures/10.jpg";
import imageEleven from "~/assets/images/pictures/11.jpg";
import imageTwelve from "~/assets/images/pictures/12.jpg";
import imageThirteen from "~/assets/images/pictures/13.jpg";
import imageFourteen from "~/assets/images/pictures/14.jpg";
import imageFifteen from "~/assets/images/pictures/15.jpg";
import imageSixteen from "~/assets/images/pictures/16.jpg";
import imageSeventeen from "~/assets/images/pictures/17.jpg";
import imageEighteen from "~/assets/images/pictures/18.jpg";
import imageNineteen from "~/assets/images/pictures/19.jpg";
import imageTwenty from "~/assets/images/pictures/20.jpg";
import imageReaction from "~/assets/images/pictures/reaction.png";

export const generateRandomAvatar = () => {
  const avatars = [
    avatarOne,
    avatarTwo,
    avatarThree,
    avatarFour,
    avatarFive,
    avatarSix,
    avatarSeven,
    avatarEight,
    avatarNine,
    avatarTen,
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const generateRandomReaction = () => {
  const reactions = [imageReaction];
  return reactions[Math.floor(Math.random() * reactions.length)];
};

export const generateRandomImage = () => {
  const images = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight,
    imageNine,
    imageTen,
    imageEleven,
    imageTwelve,
    imageThirteen,
    imageFourteen,
    imageFifteen,
    imageSixteen,
    imageSeventeen,
    imageEighteen,
    imageNineteen,
    imageTwenty,
  ];
  return images[Math.floor(Math.random() * images.length)];
};
