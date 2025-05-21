// src/services/tieringService.js - Using direct MySQL connection

import { query, queryOne, count, insert } from '@/src/lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get tiering data for a user by account ID
 * @param {string} account - User account ID
 * @returns {Promise<Object>} Tiering data
 */
export async function getTieringData(account) {
  try {
    // Get current month
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    
    // Count AWBs for this month
    const countSql = `
      SELECT COUNT(*) as count
      FROM tier_progress
      WHERE account = ?
      AND MONTH(created_at) = ?
    `;
    
    const countResult = await queryOne(countSql, [account, currentMonth]);
    const jumlahAwb = countResult ? countResult.count : 0;
    
    // Get highest tier (peak tier)
    const peakTierSql = `
      SELECT step, total_awb_goal, icon, insentif, insentif_konversi
      FROM tier_master
      ORDER BY CAST(total_awb_goal AS SIGNED INTEGER) DESC
      LIMIT 1
    `;
    
    const peakTier = await queryOne(peakTierSql);
    
    // Find current tier based on AWB count
    let currentTierSql;
    if (jumlahAwb <= parseInt(peakTier.total_awb_goal)) {
      currentTierSql = `
        SELECT step, total_awb_goal, insentif, insentif_konversi
        FROM tier_master
        WHERE total_awb_goal >= ?
        ORDER BY step ASC
        LIMIT 1
      `;
    } else {
      currentTierSql = `
        SELECT step, total_awb_goal, icon, insentif, insentif_konversi
        FROM tier_master
        ORDER BY CAST(total_awb_goal AS SIGNED INTEGER) DESC
        LIMIT 1
      `;
    }
    
    const currentTier = await queryOne(currentTierSql, [jumlahAwb]);
    
    // Add additional properties to current tier
    currentTier.total_awb = jumlahAwb;
    currentTier.peak_tier = peakTier;
    currentTier.periode = now.toLocaleString('en-US', { month: 'long' }) + ' ' + now.getFullYear();
    
    // Get all tier messages
    const messagesSql = `
      SELECT id, title, description, color_hex as colorHex, type
      FROM tier_messages
    `;
    
    const tierMessages = await query(messagesSql);
    
    // Get all tier levels
    const tierListSql = `
      SELECT tier_name, step, total_awb_goal, icon, icon_box, insentif_konversi, 
             bg_color_start, bg_color_end, title, description
      FROM tier_master
      ORDER BY step
    `;
    
    const listTiering = await query(tierListSql);
    
    // Process tier messages to replace placeholders
    for (let i = 0; i < tierMessages.length; i++) {
      // Replace [tier_insentif]
      tierMessages[i].description = tierMessages[i].description.replace(
        '[tier_insentif]', 
        currentTier.insentif_konversi
      );
      
      // Additional replacements as needed based on your business logic
      // Similar to the logic in your Laravel controller
    }
    
    return {
      resultcode: 0,
      message: 'Berhasil !',
      data: {
        current_tier: currentTier,
        text_desciption: tierMessages,
        list_tiering: listTiering
      }
    };
  } catch (error) {
    console.error('Error in getTieringData:', error);
    return {
      resultcode: 1,
      message: 'Gagal !',
      error: error.message
    };
  }
}

/**
 * Get tiering incentive history for a user
 * @param {string} account - User account ID
 * @returns {Promise<Object>} Tiering history
 */
export async function getTieringHistory(account) {
  try {
    const sql = `
      SELECT total_awb, insentif, periode, created_at
      FROM tier_report
      WHERE account = ?
      ORDER BY created_at DESC
    `;
    
    const dataBonus = await query(sql, [account]);
    
    return {
      resultcode: 0,
      message: 'Berhasil !',
      information: "Saldo insentif akan ditransfer ke nomor rekeningmu maksimal pada minggu ketiga di bulan berikutnya",
      list_riwayat_bonus: dataBonus
    };
  } catch (error) {
    console.error('Error in getTieringHistory:', error);
    return {
      resultcode: 1,
      message: 'Gagal !',
      error: error.message
    };
  }
}

/**
 * Record a new AWB for tiering progress
 * @param {string} account - User account ID
 * @param {string} awb - AWB number
 * @returns {Promise<Object>} Result
 */
export async function recordAwb(account, awb) {
  try {
    const uuid = uuidv4();
    
    await insert('tier_progress', {
      id: uuid,
      awb: awb,
      account: account,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    return {
      resultcode: 0,
      message: 'Berhasil !'
    };
  } catch (error) {
    console.error('Error in recordAwb:', error);
    return {
      resultcode: 1,
      message: 'Gagal !',
      error: error.message
    };
  }
}

/**
 * Generate monthly tiering reports
 * This would replace your Laravel cron job
 */
export async function generateMonthlyReports() {
  try {
    // Get previous month
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const monthName = prevMonth.toLocaleString('en-US', { month: 'long' });
    const yearNum = prevMonth.getFullYear();
    
    console.log(`Processing reports for ${monthName} ${yearNum}`);
    
    // Get all unique accounts from tier_progress
    const accountsSql = `
      SELECT DISTINCT account
      FROM tier_progress
      WHERE created_at BETWEEN ? AND ?
    `;
    
    const accounts = await query(accountsSql, [prevMonth, prevMonthEnd]);
    console.log(`Found ${accounts.length} accounts to process`);
    
    for (const accountObj of accounts) {
      const account = accountObj.account;
      
      // Count AWBs for this account in previous month
      const countSql = `
        SELECT COUNT(*) as count
        FROM tier_progress
        WHERE account = ?
        AND created_at BETWEEN ? AND ?
      `;
      
      const countResult = await queryOne(countSql, [account, prevMonth, prevMonthEnd]);
      const awbCount = countResult ? countResult.count : 0;
      
      console.log(`Account ${account} has ${awbCount} AWBs for ${monthName}`);
      
      // Get all tiers ordered by step
      const tiersSql = `
        SELECT step, tier_name, total_awb_goal, insentif
        FROM tier_master
        ORDER BY CAST(step AS SIGNED INTEGER) ASC
      `;
      
      const allTiers = await query(tiersSql);
      
      // Find the highest tier the user qualifies for
      let tier = allTiers[0]; // Default to lowest tier
      
      for (const t of allTiers) {
        if (awbCount >= parseInt(t.total_awb_goal)) {
          tier = t;
        } else {
          break;
        }
      }
      
      console.log(`Account ${account} achieved ${tier.tier_name} tier with incentive ${tier.insentif}`);
      
      // Insert tier report
      await insert('tier_report', {
        id: uuidv4(),
        account: account,
        total_awb: awbCount,
        insentif: tier.insentif || '0',
        periode: `${monthName} ${yearNum}`,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log(`Created tier report for account ${account}`);
    }
    
    return {
      resultcode: 0,
      message: 'Monthly reports generated successfully'
    };
  } catch (error) {
    console.error('Error generating monthly reports:', error);
    return {
      resultcode: 1,
      message: 'Failed to generate monthly reports',
      error: error.message
    };
  }
}