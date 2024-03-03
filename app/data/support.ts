import { headers } from "next/headers";

export type TTicketInfoEntry = {
  id: number;
  createdOn: Date;
  closedOn: Date | null;
  mostRecentAuthorId: number | null;
  firstComment: string | null;
  lastUpdate: Date | null;
  title: string;
};

export const getAllTicketsForCustomer = (): Promise<TTicketInfoEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new products are added
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support`, {
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          reject(await response.text());
        } else {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
