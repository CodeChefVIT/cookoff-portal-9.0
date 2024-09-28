import { type NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY!;

let countdownEndTime: number | null = null;
interface CountdownBody {
  secretKey: string;
  countdownTime: number;
}
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CountdownBody;
    const { secretKey, countdownTime } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 },
      );
    }

    if (
      !countdownTime ||
      typeof countdownTime !== "number" ||
      countdownTime <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid countdown time" },
        { status: 400 },
      );
    }

    if (countdownEndTime === null) {
      countdownEndTime = Date.now() + countdownTime * 1000;
      return NextResponse.json(
        { message: "Timer started", countdownEndTime },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Timer already started", countdownEndTime },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}

export async function GET() {
  // If the countdown hasn't started
  if (countdownEndTime === null) {
    return NextResponse.json(
      { message: "Timer not started yet", remainingTime: 0 },
      { status: 400 },
    );
  }

  const remainingTime = countdownEndTime - Date.now();

  // If the countdown has ended
  if (remainingTime <= 0) {
    countdownEndTime = null;
    return NextResponse.json(
      { message: "Countdown ended", remainingTime: 0 },
      { status: 200 },
    );
  }

  // Return the remaining countdown time
  return NextResponse.json(
    {
      message: "Countdown active",
      remainingTime: Math.floor(remainingTime / 1000),
    },
    { status: 200 },
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as { secretKey: string };
    const { secretKey } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 },
      );
    }

    if (countdownEndTime === null) {
      return NextResponse.json(
        { message: "No active countdown to stop" },
        { status: 400 },
      );
    }

    countdownEndTime = null;

    return NextResponse.json(
      { message: "Countdown stopped", remainingTime: 0 },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
