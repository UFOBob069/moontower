import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDUOsmYVV8yNXiU_d4TnvJklFwnQeqnCmBWCFmVLu0Z7Q_aFTTM9UzTzKbnbO5Cj2Ybg/exec';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        zipCode: data.zipCode,
        propertyType: data.propertyType,
        email: data.email,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        phone: data.phone
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status === 'success') {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 