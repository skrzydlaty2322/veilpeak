-- Step 1: Create products table
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  tag text,
  in_stock boolean default true,
  created_at timestamptz default now()
);

-- Step 2: Seed products
insert into products (slug, name, description, price, image_url, tag, in_stock) values
(
  'summit-shell-jacket',
  'Summit Shell Jacket',
  'Three-layer GORE-TEX Pro membrane, fully taped seams, and articulated patterning for unrestricted movement. Designed for sustained effort in mixed alpine conditions — from high ridgelines to exposed couloirs.',
  420,
  '/images/jacket.png',
  'Bestseller',
  true
),
(
  'alpine-hardshell-trousers',
  'Alpine Hardshell Trousers',
  'Hardshell trousers built for high-output alpine climbing. Lightweight 2.5-layer construction, full-length side zips for ventilation, and reinforced instep patches for crampon compatibility.',
  280,
  '/images/pants.png',
  null,
  true
),
(
  'expedition-pack-45l',
  'Expedition Pack 45L',
  '45-litre load-carry optimised for multi-day alpine objectives. Removable framesheet, ice axe loops, rope strap, and an adjustable hipbelt system designed to perform under heavy loads on steep terrain.',
  195,
  '/images/pack.png',
  'New',
  true
),
(
  'summit-shell-set',
  'Summit Shell Set',
  'The Summit Shell Jacket and Alpine Hardshell Trousers built as a complete system — layered defence against summit conditions, cut for movement, not just coverage. Windproof, seam-sealed, and insulated to −40°C with proprietary AlpineFill.',
  575,
  '/images/fullset.png',
  'Bundle',
  true
);

-- Step 3: Create orders table
create table orders (
  id uuid primary key default gen_random_uuid(),
  status text default 'paid',
  items jsonb not null,
  total numeric not null,
  customer jsonb not null,
  created_at timestamptz default now()
);
