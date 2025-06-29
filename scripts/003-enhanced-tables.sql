-- Mejorar las tablas existentes y agregar nuevas funcionalidades

-- Agregar más campos a la tabla de artistas
ALTER TABLE artists ADD COLUMN IF NOT EXISTS hourly_rate DECIMAL(10,2) DEFAULT 150.00;
ALTER TABLE artists ADD COLUMN IF NOT EXISTS availability_schedule JSONB DEFAULT '{"monday": ["09:00", "17:00"], "tuesday": ["09:00", "17:00"], "wednesday": ["09:00", "17:00"], "thursday": ["09:00", "17:00"], "friday": ["09:00", "17:00"], "saturday": ["10:00", "16:00"], "sunday": []}';
ALTER TABLE artists ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT TRUE;
ALTER TABLE artists ADD COLUMN IF NOT EXISTS portfolio_count INTEGER DEFAULT 0;
ALTER TABLE artists ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.00;

-- Agregar más campos a la tabla de citas
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS consultation_type VARCHAR(50) DEFAULT 'presencial';
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS tattoo_size VARCHAR(20);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS tattoo_style VARCHAR(50);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reference_images TEXT[];
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS budget_range VARCHAR(50);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS is_first_tattoo BOOLEAN DEFAULT FALSE;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS preferred_date_2 DATE;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS preferred_date_3 DATE;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS session_number INTEGER DEFAULT 1;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 1;

-- Crear tabla de horarios disponibles
CREATE TABLE IF NOT EXISTS available_slots (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de precios por categoría
CREATE TABLE IF NOT EXISTS pricing_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    size_small_min DECIMAL(10,2) DEFAULT 100.00,
    size_small_max DECIMAL(10,2) DEFAULT 300.00,
    size_medium_min DECIMAL(10,2) DEFAULT 300.00,
    size_medium_max DECIMAL(10,2) DEFAULT 600.00,
    size_large_min DECIMAL(10,2) DEFAULT 600.00,
    size_large_max DECIMAL(10,2) DEFAULT 1200.00,
    size_xlarge_min DECIMAL(10,2) DEFAULT 1200.00,
    size_xlarge_max DECIMAL(10,2) DEFAULT 2500.00,
    hourly_rate DECIMAL(10,2) DEFAULT 150.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de consultas
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    preferred_artist_id INTEGER REFERENCES artists(id),
    consultation_date DATE,
    consultation_time TIME,
    tattoo_idea TEXT NOT NULL,
    reference_images TEXT[],
    budget_range VARCHAR(50),
    size_preference VARCHAR(20),
    placement_preference VARCHAR(100),
    style_preference VARCHAR(50),
    is_first_tattoo BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_artist ON appointments(artist_id);
CREATE INDEX IF NOT EXISTS idx_available_slots_date ON available_slots(date);
CREATE INDEX IF NOT EXISTS idx_available_slots_artist ON available_slots(artist_id);
CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(consultation_date);
