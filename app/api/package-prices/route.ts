import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('package_prices')
      .select('package_name, price')
      .order('id');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch package prices' }, { status: 500 });
    }

    // Convert to Record<string, number> format
    const prices: Record<string, number> = {};
    data?.forEach((item) => {
      prices[item.package_name] = item.price;
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
