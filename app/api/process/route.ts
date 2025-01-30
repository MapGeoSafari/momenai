import { NextRequest, NextResponse } from "next/server";
import {
  InternalServerError,
  ProcessRequest,
  ProcessResponse,
} from "../../types";

export async function POST(req: NextRequest) {
  try {
    const { solution }: ProcessRequest = await req.json();

    if (!solution) {
      return NextResponse.json(
        { error: "解決策が必要です。" },
        { status: 400 }
      );
    }

    const processSteps = generateProcessSteps(solution);

    const response: ProcessResponse = {
      success: true,
      process: processSteps,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    const internalError: InternalServerError = {
      code: "INTERNAL_SERVER_ERROR",
      message: "サーバーエラーが発生しました。",
    };
    return NextResponse.json(internalError, { status: 500 });
  }
}

function generateProcessSteps(solution: string): string[] {
  return [
    `ステップ1: "${solution}" の準備をする`,
    `ステップ2: "${solution}" を実行する`,
    `ステップ3: "${solution}" の結果を確認する`,
  ];
}
