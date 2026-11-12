-- MMUFoS Seed Data — demo users and properties
-- Run after schema.sql in Supabase SQL Editor

-- Properties
INSERT INTO properties (name, code, location, rate_per_sqft, total_fos_sqft, available_fos_sqft, total_uds_sqft, available_uds_sqft, fos_uds_ratio, building_desc, status) VALUES
  ('BIS CH5', 'BIS-CH5', 'Triplicane, Chennai', 30000, 6000, 2400, 1200, 480, 5, 'Ground floor + 4 residential floors', 'available'),
  ('Adyar Grand Square', 'AGS', 'Adyar, Chennai', 3200, 5000, 320, 1000, 64, 5, 'Premium commercial space', 'available'),
  ('T. Nagar Heritage Hub', 'TNH', 'T. Nagar, Chennai', 4100, 8000, 600, 1600, 120, 5, 'Heritage commercial complex', 'coming_soon'),
  ('Velachery Prime Plaza', 'VPP', 'Velachery, Chennai', 2800, 6000, 500, 1200, 100, 6, 'IT corridor mixed-use', 'available'),
  ('Anna Nagar Sky Residences', 'ANS', 'Anna Nagar, Chennai', 3600, 7000, 400, 1400, 80, 5, 'Premium residential tower', 'available');

-- Demo users (passwords are plaintext for demo — use hashing in production)
INSERT INTO users (username, password_hash, name, role, total_advance, non_allocated, advance_date, is_first_time_buyer) VALUES
  ('demo', 'demo', 'Demo User', 'customer', 200000, 170000, '2025-06-01', true),
  ('rajesh', 'raj123', 'Rajesh Kumar', 'customer', 250000, 75000, '2024-06-15', false),
  ('priya', 'priya123', 'Priya Sharma', 'customer', 500000, 120000, '2024-03-20', false),
  ('kumar', 'kumar123', 'Kumar S', 'customer', 180000, 180000, '2025-01-10', true),
  ('anitha', 'anitha123', 'Anitha R', 'customer', 750000, 50000, '2023-11-05', false),
  ('admin', 'admin123', 'Admin CEO', 'ceo', 0, 0, NULL, false),
  ('manager', 'mgr123', 'Manager User', 'manager', 0, 0, NULL, false),
  ('finance', 'fin123', 'Finance User', 'finance', 0, 0, NULL, false);

-- Allocations for demo users
INSERT INTO allocations (user_id, property_id, sqft, amount, rent_per_month, allocated_date, cert_no) VALUES
  -- Demo User: 1 allocation in BIS CH5
  ((SELECT id FROM users WHERE username='demo'), (SELECT id FROM properties WHERE code='BIS-CH5'), 1, 30000, 150, '2025-07-15', 'FOS-BCH-2025-0102'),
  -- Rajesh: 2 allocations
  ((SELECT id FROM users WHERE username='rajesh'), (SELECT id FROM properties WHERE code='BIS-CH5'), 3, 90000, 450, '2024-07-01', 'FOS-BCH-2024-0041'),
  ((SELECT id FROM users WHERE username='rajesh'), (SELECT id FROM properties WHERE code='AGS'), 25, 80000, 400, '2024-08-10', 'FOS-AGS-2024-0018'),
  -- Priya: 2 allocations
  ((SELECT id FROM users WHERE username='priya'), (SELECT id FROM properties WHERE code='TNH'), 50, 205000, 1025, '2024-04-05', 'FOS-TNH-2024-0009'),
  ((SELECT id FROM users WHERE username='priya'), (SELECT id FROM properties WHERE code='BIS-CH5'), 5, 150000, 750, '2024-05-15', 'FOS-BCH-2024-0055'),
  -- Anitha: 3 allocations
  ((SELECT id FROM users WHERE username='anitha'), (SELECT id FROM properties WHERE code='ANS'), 100, 360000, 1800, '2023-12-01', 'FOS-ANS-2023-0003'),
  ((SELECT id FROM users WHERE username='anitha'), (SELECT id FROM properties WHERE code='VPP'), 80, 224000, 1120, '2024-01-20', 'FOS-VPP-2024-0012'),
  ((SELECT id FROM users WHERE username='anitha'), (SELECT id FROM properties WHERE code='AGS'), 40, 116000, 580, '2024-03-10', 'FOS-AGS-2024-0027');
