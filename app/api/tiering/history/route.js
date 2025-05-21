// app/api/tiering/history/route.js - API endpoint for tiering history

import { NextResponse } from 'next/server';
import { getTieringHistory } from '@/src/services/tieringService';
import { verifyToken } from '@/src/lib/auth';

/**
 * GET handler for tiering history
 */
export async function GET(request) {
  try {
    // Get JWT token and verify
    const signature = request.headers.get('signature');
    
    if (!signature) {
      return NextResponse.json({ 
        resultcode: 5, 
        message: "Signature tidak boleh kosong." 
      }, { status: 401 });
    }
    
    // Verify token to get account
    const decodedToken = verifyToken(signature);
    
    if (!decodedToken || !decodedToken.data || !decodedToken.data.account) {
      return NextResponse.json({ 
        resultcode: 5, 
        message: "Signature tidak valid." 
      }, { status: 401 });
    }
    
    const account = decodedToken.data.account;
    
    // Get tiering history
    const result = await getTieringHistory(account);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in tiering history API:', error);
    return NextResponse.json({ 
      resultcode: 1, 
      message: 'Gagal!',
      error: error.message
    }, { status: 500 });
  }
}