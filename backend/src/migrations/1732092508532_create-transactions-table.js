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
    pgm.createTable('transactions', {
        transaction_id: {
            type: 'serial',
            primaryKey: true,
        },
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        transaction_type: {
            type: 'varchar(10)',
            notNull: true,
            check: "transaction_type IN ('income', 'outcome')",
        },
        category_id: {
            type: 'integer',
            notNull: true,
        },
        amount: {
            type: 'decimal(10, 2)',
            notNull: true,
        },
        notes: {
            type: 'text',
        },
        total: {
            type: 'decimal(10, 2)',
            notNull: true,
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.createIndex('transactions', 'user_id');
    pgm.createIndex('transactions', 'category_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('transactions');
};
