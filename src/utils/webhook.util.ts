import fetch from "node-fetch";

export const callWebhook = (url: string, body: any) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
