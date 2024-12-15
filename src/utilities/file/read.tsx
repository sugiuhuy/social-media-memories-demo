/**
 * Reads a file and returns its content as a data URL string.
 *
 * @param {File} file - The file to be read.
 * @returns {Promise<string>} A promise that resolves with the file content as a data URL string.
 *
 * @example
 * const fileContent = await readFile(file);
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Set up the onload event handler to resolve the promise with the file content
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    };

    // Set up the onerror event handler to reject the promise
    reader.onerror = reject;

    // Start reading the file as a data URL
    reader.readAsDataURL(file);
  });
}
