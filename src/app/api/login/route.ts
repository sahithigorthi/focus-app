import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const dbPath = path.join(process.cwd(), 'public', 'db.json');
    const fileContents = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(fileContents);

    const user = data.users.find(
        (u: { username: string; password: string; }) => u.username === username && u.password === password
    );

    if (user) {
      const { ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, user: userWithoutPassword });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}