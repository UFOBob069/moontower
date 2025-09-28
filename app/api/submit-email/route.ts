import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, estimate } = data;

    // Here you would typically:
    // 1. Store the email in your database
    // 2. Send a confirmation email with detailed results
    // 3. Add to your mailing list (with proper consent)

    // For now, we'll just return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your interest! We\'ve sent the detailed report to your email.' 
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 