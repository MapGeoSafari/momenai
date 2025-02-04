import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import { Item } from "../types";

export async function POST(request: Request) {
  // リクエストボディの取得
  const body = await request.json();
  // Google 認証と Vertex AI リクエスト
  const auth = new GoogleAuth({
    scopes: [process.env.VERTEX_AI_SCOPE || ""],
  });
  const client = await auth.getClient();
  const accessTokenResponse = await client.getAccessToken();
  const accessToken = accessTokenResponse.token || accessTokenResponse;

  const endpointUrl = process.env.VERTEX_AI_ENDPOINT_URL || "";

  const requestBody = {
    instances: [
      {
        content: `
You are so smart mediator.
There is a conflict and you have to deal with it.
You have to solve the conflict and output the solution following the format below.
lang: ja-jp

# Conflict
${body.description}

# Output format
\`\`\`json
{
type:"object",
properties:{
solutions:{type:"array", items:{type:"string"}, description:"A list of solutions to the conflict"},
message:{type:"string", description:"A message to make the user feel better"}
title: {type:"string", description:"Title of the conflict"}
}
}
\`\`\`


# Output example
\`\`\`json
{
solutions:["solution1", "solution2"],
message:"You can do it!",
title:"Conflict title"
}
\`\`\`

# Output lang:ja-jp
`,
      },
    ],
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
    console.error("Vertex AI リクエストエラー:", error);
    return NextResponse.json(
      { error: "Vertex AI へのリクエストに失敗しました。" },
      { status: 500 }
    );
  }
}
