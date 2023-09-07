import { useState } from "react";

export const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(
    data: { message: string; contactInfo: string },
    onSuccess: () => void,
    onFail: () => void
  ) {
    if (isLoading) return;
    setIsLoading(true);
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
      } else {
        console.log("here");
        onFail();
      }
    } catch (e) {
      console.log("there");
      onFail();
    }
    setIsLoading(false);
  }

  return { isLoading, sendMessage };
};
