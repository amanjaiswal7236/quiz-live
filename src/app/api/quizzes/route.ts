import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';
import { getAuth } from '@clerk/nextjs/server';

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  answers: Answer[];
}

interface CreateQuizBody {
  title: string;
  description: string;
  questions: Question[];
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: CreateQuizBody = await req.json();
  const { title, description, questions } = body;

  // Validate the request body
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json(
      { error: 'Title and questions are required' },
      { status: 400 }
    );
  }

  try {
    // Create a new quiz in the database
    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        creator: { connect: { externalUserId: userId } },
        questions: {
          create: questions.map((q: Question) => ({
            text: q.text,
            answers: {
              create: q.answers.map((a: Answer) => ({
                text: a.text,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    // Return the created quiz with status 201
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const quizzes = await db.quiz.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

