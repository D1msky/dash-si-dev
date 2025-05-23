// src/lib/db.js - Direct MySQL connection 

import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Execute a SQL query with parameters
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a single row from a query result
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Object|null>} First row or null
 */
export async function queryOne(sql, params = []) {
  const results = await query(sql, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Count rows from a query
 * @param {string} sql - SQL query 
 * @param {Array} params - Query parameters
 * @returns {Promise<number>} Count of rows
 */
export async function count(sql, params = []) {
  const results = await query(sql, params);
  return results.length > 0 ? parseInt(results[0].count, 10) : 0;
}

/**
 * Insert a record into a table
 * @param {string} table - Table name
 * @param {Object} data - Data to insert
 * @returns {Promise<Object>} Insert result
 */
export async function insert(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  
  const result = await query(sql, values);
  return result;
}

/**
 * Update a record in a table
 * @param {string} table - Table name
 * @param {Object} data - Data to update
 * @param {string} whereClause - WHERE clause
 * @param {Array} whereParams - WHERE parameters
 * @returns {Promise<Object>} Update result
 */
export async function update(table, data, whereClause, whereParams = []) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  
  const result = await query(sql, [...values, ...whereParams]);
  return result;
}

export default {
  query,
  queryOne,
  count,
  insert,
  update
};