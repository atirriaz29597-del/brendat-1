import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('state_prices')
      .select('state_name, fee')
      .order('state_name');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch state prices' }, { status: 500 });
    }

    // Convert to Record<string, number> format for easy lookup
    const prices: Record<string, number> = {};
    data?.forEach((item) => {
      prices[item.state_name] = item.fee;
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
