import axios, { AxiosResponse } from "axios";
import { GetRandom } from "../domain/types";

export const RandomApiClient = (baseUrl: string): { getRandom: GetRandom } => {
  const getRandom = (min: number, max: number, count: number): Promise<number[]> => {
    return axios
      .get(
        `${baseUrl}/integers/?num=${count}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
      )
      .then((response: AxiosResponse<string | number>): number[] => {
        let data: string;
        if (typeof response.data != "string") {
          data = JSON.stringify(response.data);
        } else {
          data = response.data;
        }
        return data
          .trim()
          .split("\n")
          .map((it) => parseInt(it));
      });
  };

  return {
    getRandom,
  };
};
