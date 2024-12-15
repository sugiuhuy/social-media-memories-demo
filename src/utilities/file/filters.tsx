import { MimeTypes } from "~/configurations/file";

/**
 * This function takes an array of File objects and returns an object with
 *
 * the counts of different types of files. The properties are:
 *   - unknown: The number of files with unknown mime types.
 *   - image: The number of files with image mime types.
 *   - video: The number of files with video mime types.
 *
 * @example
 * const fileType = filterFiles(files);
 */
export function filterFiles(payload: File[]) {
  const fileType: { unknown: number; image: number; video: number } = payload.reduce(
    (media, file) => {
      // If the file is an image, increment the image count. If it's a video, increment the video count.
      // If the type is unknown, increment the unknown count.
      if (MimeTypes.images.includes(file.type)) {
        media.image++;
      } else if (MimeTypes.videos.includes(file.type)) {
        media.video++;
      } else {
        media.unknown++;
      }
      return media;
    },
    // Initialize the counts to 0
    { image: 0, video: 0, unknown: 0 },
  );

  return fileType;
}
