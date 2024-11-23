/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

exports.up = (pgm) => {
  pgm.createTable("users", {
    user_id: {
      type: "serial",
      primaryKey: true,
    },
    username: {
      type: "varchar(50)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(100)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("categories", {
    category_id: {
      type: "serial",
      primaryKey: true,
    },
    category_name: {
      type: "varchar(50)",
      notNull: true,
    },
  });

  pgm.createTable("transactions", {
    transaction_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    transaction_type: {
      type: "varchar(10)",
      notNull: true,
      check: "transaction_type IN ('income', 'outcome')",
    },
    category_id: {
      type: "integer",
      notNull: true,
    },
    amount: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    notes: {
      type: "text",
    },
    date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("accounts", {
    account_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    account_name: {
      type: "varchar(50)",
      notNull: true,
    },
    balance: {
      type: "decimal(10, 2)",
      notNull: true,
    },
  });

  pgm.createTable("credit_cards", {
    card_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    card_name: {
      type: "varchar(50)",
      notNull: true,
    },
    limit: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    card_residual: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    amount: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    due_date: {
      type: "date",
      notNull: true,
    },
    percentage: {
      type: "decimal(5, 2)",
      notNull: true,
    },
  });

  pgm.createTable("debts", {
    debt_id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(50)",
      notNull: true,
    },
    debt_type: {
      type: "varchar(10)",
      notNull: true,
      check: "debt_type IN ('credit', 'debt')",
    },
    amount: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    debt_residual: {
      type: "decimal(10, 2)",
      notNull: true,
    },
    date_start: {
      type: "date",
      notNull: true,
    },
    date_end: {
      type: "date",
      notNull: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("budgets", {
    budget_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    category_id: {
      type: "integer",
      notNull: true,
      references: '"categories"',
      onDelete: "CASCADE",
    },
    period: {
      type: "varchar(20)",
      notNull: true,
    },
    start_date: {
      type: "date",
      notNull: true,
    },
    account_name: {
      type: "varchar(50)",
      notNull: true,
    },
  });

  pgm.createIndex("accounts", "user_id");
  pgm.createIndex("credit_cards", "user_id");
  pgm.createIndex("debts", "user_id");
  pgm.createIndex("budgets", "user_id");
  pgm.createIndex("budgets", "category_id");
  pgm.createIndex("transactions", "category_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("budgets");
  pgm.dropTable("debts");
  pgm.dropTable("credit_cards");
  pgm.dropTable("accounts");
  pgm.dropTable("transactions");
  pgm.dropTable("categories");
  pgm.dropTable("users");
};
