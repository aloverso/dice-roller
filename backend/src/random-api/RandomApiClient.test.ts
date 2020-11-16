import axios from "axios";
import { RandomApiClient } from "./RandomApiClient";
import { GetRandom } from "../domain/types";

jest.mock("axios");

describe("RandomApiClient", () => {
  let randomApiClient: { getRandom: GetRandom };
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    randomApiClient = RandomApiClient("www.some-cool-url.com");
  });

  it("sends request and gets response", async () => {
    const response = "   2\n3\n4\n ";
    mockedAxios.get.mockResolvedValueOnce({ data: response });

    const min = 1;
    const max = 10;
    const count = 3;
    const results = await randomApiClient.getRandom(min, max, count);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `www.some-cool-url.com/integers/?num=${count}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
    );

    expect(results).toEqual([2, 3, 4]);
  });

  it("handles a single response number", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 3 });

    const results = await randomApiClient.getRandom(1, 3, 1);

    expect(results).toEqual([3]);
  });
});
