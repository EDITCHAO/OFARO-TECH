const { query } = require('../config/database');

const columnCache = {};

const getColumns = async (table) => {
  if (columnCache[table]) return columnCache[table];
  const result = await query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1`,
    [table]
  );
  columnCache[table] = result.rows.map((row) => row.column_name);
  return columnCache[table];
};

const tableExists = async (table) => {
  const result = await query(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = $1`,
    [table]
  );
  return result.rows.length > 0;
};

const pickExisting = async (table, payload) => {
  const columns = await getColumns(table);
  const data = {};
  Object.keys(payload).forEach((key) => {
    if (columns.includes(key) && payload[key] !== undefined) {
      data[key] = payload[key];
    }
  });
  return data;
};

const insertRow = async (table, payload) => {
  const data = await pickExisting(table, payload);
  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error(`Aucune colonne valide pour ${table}`);
  }
  const values = keys.map((key) => data[key]);
  const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
  const result = await query(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,
    values
  );
  return result.rows[0];
};

const updateRow = async (table, id, payload) => {
  const data = await pickExisting(table, {
    ...payload,
    updated_at: new Date()
  });
  delete data.id;
  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error(`Aucune colonne valide pour ${table}`);
  }
  const assignments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = keys.map((key) => data[key]);
  values.push(id);
  const result = await query(
    `UPDATE ${table} SET ${assignments} WHERE id = $${keys.length + 1} RETURNING *`,
    values
  );
  return result.rows[0];
};

module.exports = {
  getColumns,
  tableExists,
  pickExisting,
  insertRow,
  updateRow,
  clearColumnCache: () => {
    Object.keys(columnCache).forEach((key) => delete columnCache[key]);
  }
};
