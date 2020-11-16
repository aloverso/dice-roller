import knex, { PgConnectionConfig } from "knex";
import { HistoryClient } from "../domain/types";
import { Roll } from "../domain/Roll";

export const PostgresHistoryClient = (connection: PgConnectionConfig): HistoryClient => {
  const kdb = knex({
    client: "pg",
    connection: connection,
  });

  const getAllHistory = (): Promise<Roll[]> => {
    return kdb("history")
      .select("die", "count", "rolls", "total", "timestamp")
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  const save = (roll: Roll): Promise<Roll> => {
    return kdb("history")
      .insert<Roll>(roll)
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  const disconnect = async (): Promise<void> => {
    await kdb.destroy();
  };

  return {
    getAllHistory,
    save,
    disconnect,
  };
};
