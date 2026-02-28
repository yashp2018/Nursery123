-- ============================================================
-- SANAP HI-TECH NURSERY — PostgreSQL Database Schema
-- ============================================================
-- Run this file once to create all tables:
--   psql -U postgres -d nursery_db -f schema.sql
-- ============================================================

-- 1. Categories
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon        VARCHAR(10),
    status      VARCHAR(20) DEFAULT 'active',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crops
CREATE TABLE IF NOT EXISTS crops (
    id            SERIAL PRIMARY KEY,
    category_id   INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name          VARCHAR(100) NOT NULL,
    duration_days VARCHAR(50),
    image_url     VARCHAR(500),
    status        VARCHAR(20) DEFAULT 'active',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Varieties
CREATE TABLE IF NOT EXISTS varieties (
    id               SERIAL PRIMARY KEY,
    crop_id          INT NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    name             VARCHAR(150) NOT NULL,
    company          VARCHAR(150),
    rate_ex_factory  NUMERIC(10,2) NOT NULL DEFAULT 0,
    rate_local_delivery NUMERIC(10,2) DEFAULT 0,
    rate_250km       NUMERIC(10,2) DEFAULT 0,
    price_15000_plus NUMERIC(10,2) DEFAULT 0,
    price_30000_plus NUMERIC(10,2) DEFAULT 0,
    stock            INT DEFAULT 0,
    min_order_qty    INT DEFAULT 50,
    description      TEXT,
    features         TEXT,        -- JSON array stored as text
    image_url        VARCHAR(500),
    status           VARCHAR(20) DEFAULT 'active',
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Users
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    phone       VARCHAR(20) UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    role        VARCHAR(20) DEFAULT 'customer',
    status      VARCHAR(20) DEFAULT 'active',
    address     TEXT,
    city        VARCHAR(100),
    pincode     VARCHAR(10),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Cart
CREATE TABLE IF NOT EXISTS cart (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    variety_id  INT NOT NULL REFERENCES varieties(id) ON DELETE CASCADE,
    quantity    INT NOT NULL DEFAULT 1,
    delivery_type VARCHAR(20) DEFAULT 'local',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, variety_id)
);

-- 6. Orders
CREATE TABLE IF NOT EXISTS orders (
    id               SERIAL PRIMARY KEY,
    user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_number     VARCHAR(50) UNIQUE NOT NULL,
    total_amount     NUMERIC(10,2) NOT NULL DEFAULT 0,
    delivery_charges NUMERIC(10,2) DEFAULT 0,
    payment_method   VARCHAR(50),
    payment_status   VARCHAR(50) DEFAULT 'pending',
    order_status     VARCHAR(50) DEFAULT 'pending',
    delivery_name    VARCHAR(150),
    delivery_phone   VARCHAR(20),
    delivery_email   VARCHAR(150),
    delivery_address TEXT,
    delivery_city    VARCHAR(100),
    delivery_state   VARCHAR(100),
    delivery_pincode VARCHAR(10),
    delivery_landmark VARCHAR(200),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id             SERIAL PRIMARY KEY,
    order_id       INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variety_id     INT NOT NULL REFERENCES varieties(id) ON DELETE CASCADE,
    quantity       INT NOT NULL,
    price_per_unit NUMERIC(10,2) NOT NULL,
    delivery_charge NUMERIC(10,2) DEFAULT 0,
    subtotal       NUMERIC(10,2) NOT NULL
);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO categories (name, description, icon) VALUES
('Vegetable Plants', 'Premium vegetable seedlings and grafted plants', '🥬'),
('Fruit Plants', 'High-yield fruit plant varieties', '🍉'),
('Flower Plants', 'Decorative and commercial flower plants', '🌸')
ON CONFLICT (name) DO NOTHING;

INSERT INTO crops (category_id, name, duration_days) VALUES
(1, 'Tomato', '20-25 days'),
(1, 'Chili', '25-30 days'),
(1, 'Brinjal', '25-30 days'),
(1, 'Capsicum', '25-30 days'),
(1, 'Cucumber', '15-20 days'),
(2, 'Watermelon', '20-25 days'),
(1, 'Bitter Gourd', '15-20 days'),
(1, 'Cauliflower', '20-25 days'),
(1, 'Cabbage', '20-25 days')
ON CONFLICT DO NOTHING;

-- Tomato varieties
INSERT INTO varieties (crop_id, name, company, rate_ex_factory, price_15000_plus, price_30000_plus, rate_local_delivery, rate_250km, stock, min_order_qty, description) VALUES
(1, 'Arka Rakshak', 'IIHR Bangalore', 1.50, 1.30, 1.10, 0.20, 0.50, 50000, 1000, 'Triple disease resistant grafted tomato. Excellent for polyhouse and open field.'),
(1, 'Namdhari 600', 'Namdhari Seeds', 1.50, 1.30, 1.10, 0.20, 0.50, 40000, 1000, 'High-yield hybrid tomato with excellent shelf life.'),
(1, 'Abhinav', 'Seminis', 1.50, 1.30, 1.10, 0.20, 0.50, 35000, 1000, 'Semi-determinate hybrid with good disease tolerance.'),
(1, 'TO-1057', 'Syngenta', 1.50, 1.30, 1.10, 0.20, 0.50, 30000, 1000, 'Heat-tolerant hybrid suitable for tropical conditions.'),
(1, 'Aryaman', 'Seminis', 1.50, 1.30, 1.10, 0.20, 0.50, 25000, 1000, 'Premium determinate hybrid with firm round fruits.'),
-- Chili varieties
(2, 'VNR 332', 'VNR Seeds', 1.40, 1.20, 1.00, 0.20, 0.50, 40000, 1000, 'High-pungency dual purpose chili. Excellent fresh and dry yield.'),
(2, 'Bullet', 'Syngenta', 1.40, 1.20, 1.00, 0.20, 0.50, 35000, 1000, 'Compact plant with prolific bearing. Good for green chili market.'),
(2, 'Wonder Hot', 'Seminis', 1.40, 1.20, 1.00, 0.20, 0.50, 30000, 1000, 'Extra hot variety with dark green glossy fruits.'),
-- Brinjal varieties
(3, 'Mahy Krtika (MHB-10)', 'Mahyco', 1.40, 1.20, 1.00, 0.20, 0.50, 25000, 1000, 'Purple oblong brinjal with high yield potential.'),
(3, 'NBH-1701', 'Namdhari Seeds', 1.40, 1.20, 1.00, 0.20, 0.50, 20000, 1000, 'Long purple hybrid brinjal for commercial cultivation.'),
-- Capsicum varieties
(4, 'Indra', 'Syngenta', 2.50, 2.20, 2.00, 0.30, 0.60, 20000, 500, 'Green-to-red blocky capsicum. Polyhouse variety with thick walls.'),
(4, 'Inspiration', 'Seminis', 2.50, 2.20, 2.00, 0.30, 0.60, 15000, 500, 'Yellow capsicum hybrid for protected cultivation.'),
-- Cucumber varieties
(5, 'Multistar', 'Yuksel Seeds', 2.00, 1.80, 1.60, 0.20, 0.50, 25000, 500, 'Parthenocarpic seedless cucumber for polyhouse.'),
-- Watermelon varieties
(6, 'Sugar Queen', 'Syngenta', 3.50, 3.00, 2.50, 0.30, 0.60, 15000, 500, 'Icebox-type small watermelon with high sugar content.'),
-- Bitter Gourd
(7, 'US 6214', 'US Agri Seeds', 4.50, 4.00, 3.50, 0.30, 0.60, 10000, 500, 'Dark green bitter gourd with uniform spine pattern.'),
-- Cauliflower
(8, 'White Flash', 'Seminis', 1.50, 1.30, 1.10, 0.20, 0.50, 20000, 1000, 'Early maturing cauliflower with dense white curd.'),
-- Cabbage
(9, 'Green Crown', 'Known You Seed', 1.50, 1.30, 1.10, 0.20, 0.50, 18000, 1000, 'Compact round cabbage with excellent head weight.')
ON CONFLICT DO NOTHING;

-- Default admin user (password: admin123 — change in production!)
INSERT INTO users (name, email, phone, password, role) VALUES
('Admin', 'admin@sanapnursery.com', '9999999999', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON CONFLICT (email) DO NOTHING;
