import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get('entity');

    // If entity is provided, get fee for that specific entity type
    if (entity) {
      const { data, error } = await supabase
        .from('state_entity_fees')
        .select('state_name, fee')
        .eq('entity_type', entity)
        .order('state_name');

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: 'Failed to fetch state prices' }, { status: 500 });
      }

      // Convert to Record<string, number> format for easy lookup
      const prices: Record<string, number | null> = {};
      data?.forEach((item) => {
        prices[item.state_name] = item.fee;
      });

      return NextResponse.json(prices);
    }

    // Fallback: return LLC fees (backward compatibility)
    const { data, error } = await supabase
      .from('state_entity_fees')
      .select('state_name, fee')
      .eq('entity_type', 'LLC')
      .order('state_name');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch state prices' }, { status: 500 });
    }

    const prices: Record<string, number | null> = {};
    data?.forEach((item) => {
      prices[item.state_name] = item.fee;
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
