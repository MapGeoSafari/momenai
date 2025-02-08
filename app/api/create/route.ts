import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";

export async function POST(request: Request) {
  // リクエストボディの取得
  const body = await request.json();
  // Google 認証と Vertex AI リクエスト
  const auth = new GoogleAuth({
    scopes: [process.env.VERTEX_AI_SCOPE || ""],
  });

  console.log("auth", auth);

  const client = await auth.getClient();
  const accessTokenResponse = await client.getAccessToken();
  const accessToken = accessTokenResponse.token || accessTokenResponse;

  const endpointUrl = process.env.VERTEX_AI_ENDPOINT_URL || "";
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: body.description,
          },
        ],
      },
    ],
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: `
You are so smart mediator.
User has concerns with someone who the user has a conflict with.
The user wants to improve the relationship with the person.
The user input a conflict and you have to solve it.
You have to solve the conflict and output the solution following the format below.
lang: ja-jp`,
        },
      ],
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          solutions: {
            type: "array",
            items: { type: "string" },
            description: "A list of solutions to the conflict",
          },
          message: {
            type: "string",
            description: "A message to make the user feel better",
          },
          title: { type: "string", description: "Title of the conflict" },
        },
        required: ["solutions", "message", "title"],
      },
    },
  };

  try {
    const response = await axios.post(endpointUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.dir(error, { depth: null });
    console.error("Vertex AI リクエストエラー:", error);
    return NextResponse.json(
      { error: "Vertex AI へのリクエストに失敗しました。" },
      { status: 500 }
    );
  }
}
