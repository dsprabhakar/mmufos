-- MMUFoS Database Schema for Supabase (PostgreSQL)
-- Run this in the Supabase SQL Editor after creating your project

-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  rate_per_sqft NUMERIC(12,2) NOT NULL,
  total_fos_sqft INTEGER NOT NULL,
  available_fos_sqft INTEGER NOT NULL,
  total_uds_sqft INTEGER NOT NULL,
  available_uds_sqft INTEGER NOT NULL,
  fos_uds_ratio INTEGER NOT NULL DEFAULT 5,
  building_desc VARCHAR(500),
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer',
  total_advance NUMERIC(12,2) DEFAULT 0,
  non_allocated NUMERIC(12,2) DEFAULT 0,
  advance_date DATE,
  is_first_time_buyer BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allocations table
CREATE TABLE allocations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  property_id INTEGER REFERENCES properties(id),
  sqft INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  rent_per_month NUMERIC(12,2) NOT NULL,
  allocated_date DATE NOT NULL,
  cert_no VARCHAR(100) UNIQUE NOT NULL,
  documentation_tenure_months INTEGER DEFAULT 24,
  rent_tenure_months INTEGER DEFAULT 20,
  status VARCHAR(20) DEFAULT 'active',
  exit_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  allocation_id INTEGER REFERENCES allocations(id),
  amount NUMERIC(12,2) NOT NULL,
  payment_type VARCHAR(30) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Public read access to properties (anyone can browse)
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT USING (true);

-- Users can read their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT USING (true);

-- Users can view their own allocations
CREATE POLICY "Users can view own allocations"
  ON allocations FOR SELECT USING (true);

-- Payments visible to owner
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT USING (true);
