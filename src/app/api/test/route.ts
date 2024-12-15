import { NextRequest ,NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '~/server/db';

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // find user by id
    const user = await db.user.findUnique({ where: { externalUserId: userId } });
    return NextResponse.json({message: 'User found', user: user});
}
