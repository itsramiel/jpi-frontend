import { useState } from "react";

export const useSendMessage = () => {
  const [state, setState] = useState<null | "loading" | "error">(null);

  async function sendMessage(
    data: { message: string; contactInfo: string },
    onSuccess: () => void
  ) {
    if (state === "loading") return;
    setState("loading");
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
        {
          method: "POST",
          body: JSON.stringify({ data }),
          headers: myHeaders,
        }
      );
      if (result.ok) {
        onSuccess();
        setState(null);
      } else {
        setState("error");
      }
    } catch (e) {
      setState("error");
    }
  }

  return { state, sendMessage };
};
