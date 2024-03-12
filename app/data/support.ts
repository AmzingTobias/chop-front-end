import { headers } from "next/headers";
import { EAccountTypes } from "./auth";

export interface ITicketInfoEntry {
  id: number;
  createdOn: Date;
  closedOn: Date | null;
  mostRecentAuthorId: number | null;
  lastUpdate: Date | null;
  firstComment: string | null;
  title: string;
}

export interface ITicketInfoEntryStaff extends ITicketInfoEntry {
  assignedSupportId: number | null;
}

export const getAllTickets = (): Promise<ITicketInfoEntryStaff[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support`, {
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

export const getAllTicketsForCustomer = (): Promise<ITicketInfoEntry[]> => {
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
): Promise<ITicketInfoEntry | null> => {
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
  authorAccountType: EAccountTypes;
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

export const createTicket = (ticketTitle: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/`, {
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ title: ticketTitle }),
    })
      .then(async (response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData["ticketId"]);
            })
            .catch((err) => reject(err));
        } else {
          reject(await response.text());
        }
      })
      .catch((err) => reject(err));
  });
};

export type TSupportAccount = {
  supportId: number;
  email: string;
};

export const getAssignedSupportStaffForTicket = (
  ticketId: number
): Promise<TSupportAccount | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/assign`,
      {
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
              resolve(jsonData["assignedSupportStaff"]);
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

export const unassignStaffFromTicket = (ticketId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/assign`,
      {
        mode: "cors",
        method: "delete",
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          reject(await response.text());
        } else {
          resolve();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export interface ISupportStaffWithAssigned extends TSupportAccount {
  ticketCount: number;
}
export const getSupportStaffAvailable = (): Promise<
  ISupportStaffWithAssigned[]
> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/accounts`,
      {
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

export const assignSupportStaffToTicket = (
  ticketId: number,
  supportStaffId?: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/assign`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        method: "put",
        credentials: "include",
        body:
          supportStaffId === undefined
            ? null
            : JSON.stringify({ supportAccountId: supportStaffId }),
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          reject(await response.text());
        } else {
          resolve();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCustomerIdForTicket = (
  ticketId: number
): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/support/${ticketId}/customer`,
      {
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
              resolve(jsonData["customerId"]);
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
