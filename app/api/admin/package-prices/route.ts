import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch package prices for a specific state
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');

    if (!state) {
      return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('state_package_prices')
      .select('*')
      .eq('state_name', state)
      .order('id');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch package prices' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update package prices for a specific state
export async function PUT(request: Request) {
  try {
    const { state, updates } = await request.json();
    
    if (!state) {
      return NextResponse.json({ error: 'State is required' }, { status: 400 });
    }

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const updatePromises = Object.entries(updates).map(([packageName, price]) =>
      supabase
        .from('state_package_prices')
        .update({ price: price as number, updated_at: new Date().toISOString() })
        .eq('state_name', state)
        .eq('package_name', packageName)
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
