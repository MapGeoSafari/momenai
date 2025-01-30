import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  CreateRequest,
  CreateResponse,
  InternalServerError,
  ValidationError,
} from "../../types";

const items: CreateResponse[] = [];

export async function POST(req: NextRequest) {
  try {
    const body: CreateRequest = await req.json();

    if (!body.problem.title) {
      const error: ValidationError = {
        code: "VALIDATION_ERROR",
        message: "タイトルは必須です。",
        details: ["problem.title is required"],
      };
      return NextResponse.json(error, { status: 400 });
    }

    const newItem: CreateResponse = {
      id: uuidv4(),
      solutions: [],
      events: [],
    };

    items.push(newItem);

    return NextResponse.json(newItem, { status: 200 });
  } catch (error) {
    console.error(error);
    const internalError: InternalServerError = {
      code: "INTERNAL_SERVER_ERROR",
      message: "サーバーエラーが発生しました。",
    };
    return NextResponse.json(internalError, { status: 500 });
  }
}
