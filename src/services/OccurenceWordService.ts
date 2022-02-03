import { Readable } from "stream";

export default class OccurenceWordService {
  // we use a hashMap to store occurrences since keys are unique and quick access time is important
  private occurrenceHashMap: Map<string, number> = new Map<string, number>();
  private SPACE_PATTERN: RegExp = /\s+/g;
  // everything except a word (which consists of a-z or ' or space in between)
  private NON_WORD_PATTERN: RegExp = /[^a-zA-Z' ]+/;
  // uses streams to handle large inputs, either from file or simple string
  private inputStream: Readable = Readable.from([]);

  setup(inputStream: Readable) {
    this.inputStream = inputStream;
  }

  /**
   *
   * @param limit our query limit
   * @returns array of top n words with the most occurrence
   * @description gets stream of chunks, uses a hashMap to compute the total occurences of words
   */
  async getTopOccurredWords(limit: number = 3): Promise<string[]> {
    console.time("execuiton time");
    for await (const chunk of this.inputStream) {
      /**
       * get each chunk of stream
       * remove non-normal words
       * remove extra spaces with a single space
       * split into words
       * compute the hashMap
       */
      const words: string[] = Buffer.from(chunk)
        .toString()
        .replace(this.NON_WORD_PATTERN, "")
        .replace(this.SPACE_PATTERN, " ")
        .split(" ");
      // loop throughout the words of each chunk and compute the hashMap
      words.forEach((word) => {
        // since comparison is case-insensitive
        if (this.occurrenceHashMap.has(word.toLowerCase())) {
          this.occurrenceHashMap.set(
            word.toLowerCase(),
            (this.occurrenceHashMap.get(word.toLowerCase()) || 0) + 1
          );
        }
        // here we check for word to prevent empty strings as a word
        else if (word) {
          this.occurrenceHashMap.set(word.toLowerCase(), 1);
        }
      });
    }
    console.timeEnd("execuiton time");
    // get the top limit words with most occurrences
    return Array.from(this.occurrenceHashMap.entries())
      .sort(
        (firstOccurrence, secondOccurence) =>
          secondOccurence[1] - firstOccurrence[1]
      )
      .map((entry) => entry[0])
      .slice(0, limit);
  }
}
