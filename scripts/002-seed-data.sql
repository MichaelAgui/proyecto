-- Insertar datos de ejemplo para Inskpire

-- Insertar artistas
INSERT INTO artists (name, email, phone, bio, specialties, image_url, instagram_handle, years_experience) VALUES
('Carlos Mendoza', 'carlos@inskpire.com', '+1-555-0101', 'Especialista en tatuajes realistas y retratos. Más de 8 años creando arte en la piel con técnicas avanzadas de sombreado.', ARRAY['Realismo', 'Retratos', 'Blanco y Negro'], '/placeholder.svg?height=400&width=400', '@carlos_ink', 8),
('Sofia Rodriguez', 'sofia@inskpire.com', '+1-555-0102', 'Artista especializada en tatuajes tradicionales y neo-tradicionales. Amante de los colores vibrantes y diseños únicos.', ARRAY['Tradicional', 'Neo-tradicional', 'Color'], '/placeholder.svg?height=400&width=400', '@sofia_tattoos', 6),
('Miguel Torres', 'miguel@inskpire.com', '+1-555-0103', 'Experto en tatuajes geométricos y minimalistas. Creador de diseños únicos con líneas precisas y conceptos modernos.', ARRAY['Geométrico', 'Minimalista', 'Línea fina'], '/placeholder.svg?height=400&width=400', '@miguel_geometric', 5);

-- Insertar portafolios
INSERT INTO portfolios (artist_id, title, description, image_url, category, tags) VALUES
(1, 'Retrato Realista León', 'Tatuaje realista de león en brazo completo', '/placeholder.svg?height=600&width=400', 'Realismo', ARRAY['león', 'realismo', 'brazo']),
(1, 'Retrato Familiar', 'Retrato realista de familia en espalda', '/placeholder.svg?height=600&width=400', 'Retratos', ARRAY['familia', 'retrato', 'espalda']),
(2, 'Rosa Tradicional', 'Rosa tradicional americana con banner', '/placeholder.svg?height=600&width=400', 'Tradicional', ARRAY['rosa', 'tradicional', 'color']),
(2, 'Calavera Neo-tradicional', 'Calavera con elementos neo-tradicionales', '/placeholder.svg?height=600&width=400', 'Neo-tradicional', ARRAY['calavera', 'neo-tradicional']),
(3, 'Mandala Geométrico', 'Diseño mandala con patrones geométricos', '/placeholder.svg?height=600&width=400', 'Geométrico', ARRAY['mandala', 'geométrico', 'simétrico']),
(3, 'Líneas Minimalistas', 'Tatuaje minimalista de montañas', '/placeholder.svg?height=600&width=400', 'Minimalista', ARRAY['montañas', 'minimalista', 'líneas']);

-- Insertar galería
INSERT INTO gallery (title, description, image_url, artist_id, category, tags, featured) VALUES
('Obra Maestra Realista', 'Increíble trabajo de realismo', '/placeholder.svg?height=500&width=500', 1, 'Realismo', ARRAY['realismo', 'destacado'], TRUE),
('Color Vibrante', 'Explosión de colores tradicionales', '/placeholder.svg?height=500&width=500', 2, 'Color', ARRAY['color', 'vibrante'], TRUE),
('Geometría Perfecta', 'Precisión en cada línea', '/placeholder.svg?height=500&width=500', 3, 'Geométrico', ARRAY['geométrico', 'precisión'], TRUE),
('Arte en Movimiento', 'Tatuaje que cobra vida', '/placeholder.svg?height=500&width=500', 1, 'Realismo', ARRAY['movimiento', 'arte'], FALSE),
('Tradición Moderna', 'Fusión de estilos clásicos y modernos', '/placeholder.svg?height=500&width=500', 2, 'Fusión', ARRAY['tradicional', 'moderno'], FALSE);

-- Insertar testimonios
INSERT INTO testimonials (client_name, rating, comment, artist_id, featured) VALUES
('Ana García', 5, 'Increíble experiencia con Carlos. El realismo de mi tatuaje superó todas mis expectativas. Totalmente profesional y talentoso.', 1, TRUE),
('Roberto Silva', 5, 'Sofia es una artista excepcional. Los colores de mi tatuaje tradicional son vibrantes y el diseño es perfecto.', 2, TRUE),
('María López', 5, 'Miguel creó un diseño geométrico único para mí. Su precisión y atención al detalle son impresionantes.', 3, TRUE),
('Diego Morales', 4, 'Excelente servicio y ambiente muy profesional. Definitivamente regresaré para mi próximo tatuaje.', 1, FALSE),
('Carmen Ruiz', 5, 'El estudio tiene un ambiente increíble y todos los artistas son muy talentosos. Altamente recomendado.', 2, FALSE);

-- Insertar algunas citas de ejemplo
INSERT INTO appointments (client_name, client_email, client_phone, artist_id, appointment_date, appointment_time, tattoo_description, estimated_duration, estimated_price, status) VALUES
('Juan Pérez', 'juan@email.com', '+1-555-1001', 1, '2024-01-15', '10:00:00', 'Retrato realista de mascota', 4, 800.00, 'confirmed'),
('Laura Martín', 'laura@email.com', '+1-555-1002', 2, '2024-01-16', '14:00:00', 'Rosa tradicional en antebrazo', 2, 300.00, 'pending'),
('Pedro Sánchez', 'pedro@email.com', '+1-555-1003', 3, '2024-01-17', '11:00:00', 'Diseño geométrico en espalda', 3, 500.00, 'confirmed');
