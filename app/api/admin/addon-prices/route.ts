import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all addon prices with full details
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('addon_prices')
      .select('*')
      .order('id');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch addon prices' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update multiple addon prices
export async function PUT(request: Request) {
  try {
    const { updates } = await request.json();
    
    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const updatePromises = Object.entries(updates).map(([addonKey, price]) =>
      supabase
        .from('addon_prices')
        .update({ price: price as number, updated_at: new Date().toISOString() })
        .eq('addon_key', addonKey)
    );

    const results = await Promise.all(updatePromises);
    
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      console.error('Update errors:', errors);
      return NextResponse.json({ error: 'Some updates failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: Object.keys(updates).length });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
