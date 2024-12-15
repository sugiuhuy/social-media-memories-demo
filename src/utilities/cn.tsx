import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that takes multiple class names and returns a single
 * class name that is the result of merging all the input class names. This
 * function is a wrapper around the clsx library, which is a utility library
 * for conditionally combining class names in JavaScript.
 *
 * @param inputs - A variadic number of class names as strings.
 * @returns A single class name that is the result of merging all the input
 * class names.
 *
 * @example
 * <div class={cn("flex", "justify-center", "items-center", { ... })}> ... </div>
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
