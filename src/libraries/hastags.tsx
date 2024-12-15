import { HastagProps } from "~/types/post-interfaces";

const int = ["Lorem", "ipsum", "dolor", "consectetur", "adipiscing", "elit", "ultrices", "ullamcorper", "luctus", "pretium"];

export default function generateHastags() {
  const hastags: HastagProps[] = [];
  const today = new Date();

  for (let i = 0; i < int.length; i++) {
    const randomCount = Math.floor(Math.random() * 50) + 1;

    const date = new Date(today);
    date.setDate(today.getDate() - i);

    hastags.push({
      _id: `${Date.now()}-${i}`,
      name: int[i],
      count: randomCount,
      createdAt: date,
    });
  }

  return hastags;
}
