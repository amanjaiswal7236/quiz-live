import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server";
import { Quiz, User } from "@prisma/client";

// interface QuizUpdateData {
//   title?: string;
//   description?: string;
// }

export async function DELETE(req: NextRequest, { params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const { userId: externalUserId } = getAuth(req);

  if (!externalUserId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Find the user ID corresponding to the externalUserId
    const user = await db.user.findUnique({
      where: { externalUserId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch the quiz to check ownership
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }
    // console.log("QuizCreatorId & UserId", quiz.creatorId, user.id)
    if (quiz.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not have permission to delete this quiz" },
        { status: 403 }
      );
    }

    await db.quiz.delete({
      where: { id: quizId },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    // console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const { userId: externalUserId } = getAuth(req);

  if (!externalUserId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Find the user ID corresponding to the externalUserId
    const user = await db.user.findUnique({
      where: { externalUserId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch the quiz to check ownership
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    if (quiz.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not have permission to update this quiz" },
        { status: 403 }
      );
    }

    const body: Quiz = await req.json();
    await db.quiz.update({
      where: { id: quizId },
      data: body,
    });

    return NextResponse.json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { quizId: string } }) {
  const { quizId } = params;

  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        creator: {
          select: { username: true, email: true, imageUrl: true },
        },
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}
