// app/api/timestamp/route.ts

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { InternalServerError, TimestampedEvent } from "../../types";

// 仮のデータストア（ローカルストレージやDBに置き換えてください）
let timestampedEvents: TimestampedEvent[] = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 必要なフィールドのバリデーション
    if (!data.title) {
      return NextResponse.json(
        { error: "タイトルが必要です。" },
        { status: 400 }
      );
    }

    const timestampedEvent: TimestampedEvent = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      timestamp: new Date().toISOString(),
      solutions: data.solutions || [],
      events: data.events || [],
    };

    timestampedEvents.push(timestampedEvent);

    return NextResponse.json(
      { success: true, data: timestampedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const internalError: InternalServerError = {
      code: "INTERNAL_SERVER_ERROR",
      message: "サーバーエラーが発生しました。",
    };
    return NextResponse.json(internalError, { status: 500 });
  }
}
