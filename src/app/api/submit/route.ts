import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { score, negative_feedback, improvement } = body;

    // Validate input
    if (typeof score !== 'number' || score < 0 || score > 10) {
      return NextResponse.json(
        { error: 'Invalid score. Must be between 0 and 10.' },
        { status: 400 }
      );
    }

    // Insert response anonymously
    const { data, error } = await supabase
      .from('responses')
      .insert([
        {
          score,
          negative_feedback: negative_feedback || null,
          improvement: improvement || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);
      return NextResponse.json(
        { error: 'Failed to submit response.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error('Server error submitting response:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
