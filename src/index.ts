import OccurenceWordService from "./services/OccurenceWordService";
import path from "path";
import { createReadStream } from "fs";

const fileReadable = createReadStream(path.resolve("input.txt"));
const occurenceWordService = new OccurenceWordService();
occurenceWordService.setup(fileReadable);

occurenceWordService
  .getTopOccurredWords(3)
  .then((topWords) => {
    console.log(topWords);
  })
  .catch((e) => {
    console.log("error in getTopOccurredWords", e);
  });
