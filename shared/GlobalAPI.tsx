import axios from "axios";

export const AIChatModel = async (messages: any) => {
  const response = await axios.post(
    "https://kravixstudio.com/api/v1/chat",
    {
      message: messages,
      aiModel: "gpt-5",
      outputType: "text",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + process.env.EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY,
      },
    }
  );

  console.log(response.data);

  return response.data;
};
