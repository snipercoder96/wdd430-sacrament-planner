DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = current_schema()
          AND table_name = 'users'
          AND column_name = 'role'
    ) THEN
        ALTER TABLE users
            ADD COLUMN role TEXT NOT NULL DEFAULT 'visitor';
    END IF;

    UPDATE users
    SET role = 'visitor'
    WHERE role IS NULL;

    ALTER TABLE users
        ALTER COLUMN role SET DEFAULT 'visitor',
        ALTER COLUMN role SET NOT NULL;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_role_check'
          AND conrelid = 'users'::regclass
    ) THEN
        ALTER TABLE users
            ADD CONSTRAINT users_role_check
            CHECK (role IN ('admin', 'visitor'));
    END IF;
END $$;
