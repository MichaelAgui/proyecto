-- Actualizar datos de artistas con nueva información
UPDATE artists SET 
    hourly_rate = 180.00,
    availability_schedule = '{"monday": ["09:00", "17:00"], "tuesday": ["09:00", "17:00"], "wednesday": ["09:00", "17:00"], "thursday": ["09:00", "17:00"], "friday": ["09:00", "17:00"], "saturday": ["10:00", "16:00"], "sunday": []}',
    portfolio_count = 25,
    rating = 4.9
WHERE id = 1;

UPDATE artists SET 
    hourly_rate = 160.00,
    availability_schedule = '{"monday": ["10:00", "18:00"], "tuesday": ["10:00", "18:00"], "wednesday": ["10:00", "18:00"], "thursday": ["10:00", "18:00"], "friday": ["10:00", "18:00"], "saturday": ["09:00", "15:00"], "sunday": []}',
    portfolio_count = 20,
    rating = 4.8
WHERE id = 2;

UPDATE artists SET 
    hourly_rate = 170.00,
    availability_schedule = '{"monday": ["08:00", "16:00"], "tuesday": ["08:00", "16:00"], "wednesday": ["08:00", "16:00"], "thursday": ["08:00", "16:00"], "friday": ["08:00", "16:00"], "saturday": ["10:00", "14:00"], "sunday": []}',
    portfolio_count = 18,
    rating = 4.9
WHERE id = 3;

-- Insertar categorías de precios
INSERT INTO pricing_categories (category_name, size_small_min, size_small_max, size_medium_min, size_medium_max, size_large_min, size_large_max, size_xlarge_min, size_xlarge_max, hourly_rate) VALUES
('Realismo', 150, 400, 400, 800, 800, 1500, 1500, 3000, 180),
('Tradicional', 100, 300, 300, 600, 600, 1200, 1200, 2000, 150),
('Geométrico', 120, 350, 350, 700, 700, 1300, 1300, 2200, 160),
('Blackwork', 130, 380, 380, 750, 750, 1400, 1400, 2500, 170),
('Japonés', 200, 500, 500, 1000, 1000, 2000, 2000, 3500, 200),
('Fine Line', 80, 250, 250, 500, 500, 900, 900, 1500, 140),
('Acuarela', 150, 400, 400, 800, 800, 1500, 1500, 2800, 175),
('Neo-tradicional', 120, 350, 350, 700, 700, 1300, 1300, 2300, 165);

-- Generar horarios disponibles para los próximos 30 días
DO $$
DECLARE
    artist_record RECORD;
    current_date DATE := CURRENT_DATE;
    end_date DATE := CURRENT_DATE + INTERVAL '30 days';
    current_time TIME;
    slot_duration INTERVAL := '2 hours';
BEGIN
    FOR artist_record IN SELECT id FROM artists LOOP
        WHILE current_date <= end_date LOOP
            -- Generar slots de 9:00 a 17:00 cada 2 horas
            current_time := '09:00:00';
            WHILE current_time <= '15:00:00' LOOP
                INSERT INTO available_slots (artist_id, date, start_time, end_time, is_booked)
                VALUES (
                    artist_record.id,
                    current_date,
                    current_time,
                    current_time + slot_duration,
                    FALSE
                );
                current_time := current_time + slot_duration;
            END LOOP;
            current_date := current_date + 1;
        END LOOP;
        current_date := CURRENT_DATE; -- Reset for next artist
    END LOOP;
END $$;
