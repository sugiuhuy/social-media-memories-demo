import { pattern } from "~/configurations/pattern";

/**
 * Transforms a content payload by replacing specific patterns with HTML links.
 *
 * @example
 * const transformedContent = transformContentPattern(payload);
 * <div innerHTML={transformedContent}></div>
 */
export default function transformContentPattern(payload: string) {
  // Replace double newlines with a single newline
  let text = payload
    .replace(/\n\n/g, "\n")
    // Replace usernames with HTML links
    .replace(
      pattern.username,
      `<a href="/@$1" class="bg-blue-600 active:bg-blue-700 rounded-lg py-1 px-2 text-neutral-50">@$1</a>`,
    )
    // Replace hashtags with HTML links
    .replace(
      pattern.hastag,
      `<a href="/explore/hastags/${decodeURIComponent("$1")}" class="text-blue-600 active:text-blue-700 no-underline">#$1</a>`,
    )
    // Replace URLs with HTML links
    .replace(pattern.url, `<a href="$&" target="_blank" class="text-blue-600 active:text-blue-700 no-underline">$&</a>`);

  return text;
}
