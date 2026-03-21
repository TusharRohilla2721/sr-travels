create table if not exists travel_routes (
  id                bigint primary key generated always as identity,
  from_city         text not null,
  to_city           text not null,
  kilometers        int,
  price_7seater     int,
  price_12seater    int,
  price_16_urbania  int,
  price_20seater    int,
  price_26seater    int,
  price_42seater    int,
  created_at        timestamptz default now()
);

create table if not exists testimonials (
  id           bigint primary key generated always as identity,
  name         text not null,
  city         text not null,
  state        text,
  from_city    text,
  to_city      text,
  journey_date date,
  feedback     text not null,
  approved     boolean not null default false,
  rejected     boolean not null default false,
  approved_at  timestamptz,
  created_at   timestamptz default now()
);

create table if not exists contact_inquiries (
  id         bigint primary key generated always as identity,
  name       text not null,
  phone      text,
  message    text,
  created_at timestamptz default now()
);

create index if not exists idx_testimonials_approved on testimonials(approved);
create index if not exists idx_routes_from           on travel_routes(from_city);
create index if not exists idx_routes_to             on travel_routes(to_city);

create or replace view approved_testimonials as
  select
    id,
    split_part(name, ' ', 1) as name,
    city,
    state,
    from_city,
    to_city,
    feedback,
    approved_at
  from testimonials
  where approved = true
  order by approved_at desc;

create or replace view pending_reviews as
  select * from testimonials
  where approved = false and rejected = false
  order by created_at desc;

alter table travel_routes     enable row level security;
alter table testimonials       enable row level security;
alter table contact_inquiries  enable row level security;

drop policy if exists "public_read_routes"       on travel_routes;
drop policy if exists "public_insert_feedback"   on testimonials;
drop policy if exists "public_insert_contact"    on contact_inquiries;
drop policy if exists "service_role_all_routes"  on travel_routes;
drop policy if exists "service_role_all_feedback" on testimonials;
drop policy if exists "service_role_all_contact" on contact_inquiries;

create policy "public_read_routes"
  on travel_routes for select
  to anon
  using (true);

create policy "service_role_all_routes"
  on travel_routes for all
  to service_role
  using (true) with check (true);

create policy "public_insert_feedback"
  on testimonials for insert
  to anon
  with check (true);

create policy "service_role_all_feedback"
  on testimonials for all
  to service_role
  using (true) with check (true);

grant select on approved_testimonials to anon;
grant select on approved_testimonials to authenticated;

create policy "public_insert_contact"
  on contact_inquiries for insert
  to anon
  with check (true);

create policy "service_role_all_contact"
  on contact_inquiries for all
  to service_role
  using (true) with check (true);
