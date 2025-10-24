-- COLE ESTE SQL NO BANCO DE PRODUÇÃO
-- Database → Production → SQL Editor → Run

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'phone'
    ) THEN
        ALTER TABLE users ADD COLUMN phone TEXT;
        RAISE NOTICE 'Coluna phone adicionada';
    END IF;
END $$;
