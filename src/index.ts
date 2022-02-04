import OccurenceWordService from "./services/OccurenceWordService";
import path from "path";
import { createReadStream, ReadStream } from "fs";

const fileReadable: ReadStream = createReadStream(path.resolve("input.txt"));
const occurenceWordService = new OccurenceWordService();
occurenceWordService.setup(fileReadable);
const limit: number = 3;

occurenceWordService
  .getTopOccurredWords(limit)
  .then((topWords) => {
    console.log(`\ntop ${limit} occurring words:`, topWords);
  })
  .catch((e) => {
    console.log("error in getTopOccurredWords", e);
  });
