// app/api/tiering/route.js - API endpoint for tiering data

import { NextResponse } from 'next/server';
import { getTieringData, recordAwb } from '@/src/services/tieringService';
import { verifyToken } from '@/src/lib/auth';

/**
 * GET handler for tiering data
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
    
    // Check if account is 2000001 (Seller Idaman check)
    if (account === "2000001") {
      return NextResponse.json({
        resultcode: 6,
        message: "Bukan Seller Idaman"
      });
    }
    
    // Get tiering data
    const result = await getTieringData(account);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in tiering API:', error);
    return NextResponse.json({ 
      resultcode: 1, 
      message: 'Gagal!',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * POST handler for recording AWBs
 */
export async function POST(request) {
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
    
    // Get request body
    const body = await request.json();
    
    if (!body.awb) {
      return NextResponse.json({ 
        resultcode: 3, 
        message: "AWB tidak boleh kosong." 
      }, { status: 400 });
    }
    
    // Record AWB
    const result = await recordAwb(account, body.awb);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in tiering API:', error);
    return NextResponse.json({ 
      resultcode: 1, 
      message: 'Gagal!',
      error: error.message
    }, { status: 500 });
  }
}