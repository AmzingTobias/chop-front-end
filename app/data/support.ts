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

export const getTicketWithId = (
  ticketId: number
): Promise<TTicketInfoEntry | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          reject(await response.text());
        } else {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData["ticket"]);
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

export type TTicketComment = {
  id: number;
  authorId: number;
  createdOn: Date;
  comment: string;
};
export const getCommentsForTicket = (
  ticketId: number
): Promise<TTicketComment[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/comments`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
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

export const addCommentToTicket = (
  ticketId: number,
  comment: string
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/comments`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ comment: comment }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(await response.text());
        }
      })
      .catch((err) => reject(err));
  });
};

export const setTicketAsClosed = (ticketId: number): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/close`,
      {
        mode: "cors",
        credentials: "include",
        method: "POST",
      }
    )
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(await response.text());
        }
      })
      .catch((err) => reject(err));
  });
};
