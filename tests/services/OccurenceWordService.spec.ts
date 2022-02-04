import "jest";
import { createReadStream } from "fs";
import { Readable } from "stream";
import path from "path";
import OccurenceWordService from "../../src/services/OccurenceWordService";

describe("OccurrenceWordService", () => {
  let instance: OccurenceWordService;
  let input: Readable;

  beforeEach(() => {
    instance = new OccurenceWordService();
    input = Readable.from([]);
  });

  it("should create an instance from OccurrenceWordService", () => {
    expect(instance).toBeInstanceOf(OccurenceWordService);
  });

  // NOTE: since input file could be anything, test could fail if we didn't change assertion
  it("should return a, of, on as 3 top words from file", async () => {
    input = createReadStream(path.resolve("input.txt"));
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual(["a", "of", "on"]);
  });

  it("should return a, of, on as 3 top words", async () => {
    input = Readable.from([
      `In a village of La Mancha, the name of which I have
    no desire to call to
    mind, there lived not long since one of those gentlemen that keep a lance
    in the lance-rack, an old buckler, a lean hack, and a greyhound for
    coursing. An olla of rather more beef than mutton, a salad on most
    nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
    on Sundays, made away with three-quarters of his income.`,
    ]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual(["a", "of", "on"]);
  });

  it("should return e, ddd, aa as 3 top words", async () => {
    input = Readable.from([
      "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e",
    ]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual(["e", "ddd", "aa"]);
  });

  it("should return e, ddd as 2 top words", async () => {
    input = Readable.from([
      "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e",
    ]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(2);
    expect(topOccurredWords).toEqual(["e", "ddd"]);
  });

  it("should return e as 1 top words", async () => {
    input = Readable.from([
      "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e",
    ]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(1);
    expect(topOccurredWords).toEqual(["e"]);
  });

  it("should return won't and wont as 2 top words", async () => {
    input = Readable.from([" //wont won't won't"]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual(["won't", "wont"]);
  });

  it("should return hello as 1 top words", async () => {
    input = Readable.from(["hello"]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual(["hello"]);
  });

  it("should return empty array", async () => {
    input = Readable.from(["                "]);
    instance.setup(input);
    const topOccurredWords: string[] = await instance.getTopOccurredWords(3);
    expect(topOccurredWords).toEqual([]);
  });
});
