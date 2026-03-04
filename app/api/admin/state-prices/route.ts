import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all state prices with full details
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('state_prices')
      .select('*')
      .order('state_name');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch state prices' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update multiple state prices
export async function PUT(request: Request) {
  try {
    const { updates } = await request.json();
    
    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Update each state price
    const updatePromises = Object.entries(updates).map(([stateName, fee]) =>
      supabase
        .from('state_prices')
        .update({ fee: fee as number, updated_at: new Date().toISOString() })
        .eq('state_name', stateName)
    );

    const results = await Promise.all(updatePromises);
    
    // Check for errors
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
