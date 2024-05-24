DROP TYPE IF EXISTS tip_mecanism;
DROP TYPE IF EXISTS gen_ceas;
DROP TYPE IF EXISTS tip_display;

CREATE TYPE tip_mecanism AS ENUM('mecanic','automatic','quartz','kinetic');
CREATE TYPE gen_ceas AS ENUM('barbati', 'femei', 'unisex');
CREATE TYPE tip_display AS ENUM('analogic','digital');


CREATE TABLE IF NOT EXISTS ceasuri (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   diametru_cadran INT NOT NULL CHECK (diametru_cadran>=0),   
   gen_ceas gen_ceas DEFAULT 'unisex',
   mecanism tip_mecanism DEFAULT 'mecanic',
   display tip_display DEFAULT 'analogic',
   brand VARCHAR(50) NOT NULL,
   functii VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   water_resistant BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into ceasuri (nume,descriere,pret,diametru_cadran,gen_ceas,mecanism,display,brand,functii,water_resistant,imagine) VALUES
('MG 257', 'Un ceas elegant potrivit pentru orice ocazie.', 2500.99, 40, 'barbati', 'automatic', 'analogic', 'Breguet', '{"data","alarma"}', False,'./resurse/imagini/imagini_produse/Breguet.jpg' ),
('Casio F91W', 'Un ceas casual, bun de luat la birou!', 500.50, 35, 'unisex', 'quartz', 'digital', 'Casio', '{"data","alarma","cronometru"}', False,'./resurse/imagini/imagini_produse/Casio_F-91W.jpg' ),
('Seamaster', 'Un ceas elegant pentru barbati', 5600.99, 42, 'barbati', 'automatic', 'analogic', 'Omega', '{"data","alarma","cronometru","cronograph"}', True,'./resurse/imagini/imagini_produse/Omega_seamaster.jpeg' ),
('G-Shock Mudman', 'Un ceas sport, rubust. Bun de luat pe munte!', 1000.50, 45, 'barbati', 'quartz', 'digital', 'Casio', '{"data","alarma","cronometru","locatie"}', True,'./resurse/imagini/imagini_produse/Casio_G-Shock_Mudman.jpg' ),
('Ceas de buzunar', 'O antichitate. Nu mai gasiti nicaieri asa ceva!!', 250.99, 38, 'unisex', 'mecanic', 'analogic', 'necunoscut', '{"data"}', False,'./resurse/imagini/imagini_produse/ceas_buzunar.jpg' ),
('Daytona', 'Un alt ceas elegant pentru barbati!', 6000.99, 40, 'barbati', 'automatic', 'analogic', 'Rolex', '{"data","alarma","cronometru"}', False,'./resurse/imagini/imagini_produse/Daytona116509.jpg' ),
('G-Shock DW-500', 'Ceas sport-casual, bun pentru orice situatie!', 700.50, 32, 'barbati', 'quartz', 'digital', 'Casio', '{"data","alarma","cronometru"}', True,'./resurse/imagini/imagini_produse/G-Shock_DW-5000.jpg' ),
('Orient 3 star', 'Ceas elegant pentru femei si barbati', 600.00, 30, 'unisex', 'mecanic', 'analogic', 'Orient', '{"data","cronometru"}', False,'./resurse/imagini/imagini_produse/Orient_3_start.jpg' ),
('Orient Capital', 'Ceas elegant pentru femei si barbati', 500.00, 30, 'unisex', 'mecanic', 'analogic', 'Orient', '{"data","cronometru"}', False,'./resurse/imagini/imagini_produse/Orient_Capital.jpg' ),
('Patek Philippe', 'Ceas elegant pentru barbati. Cel mai scump de la noi!', 7000.99, 35, 'barbati', 'automatic', 'analogic', 'Patek Philippe', '{"data","cronometru","calendar"}', False,'./resurse/imagini/imagini_produse/Patek-Philippe_MG_2583.jpg' ),
('Seiko kinetic 1', 'Ceas casual-elegant. Merge bine cu un costum!', 750.00, 38, 'barbati', 'kinetic', 'analogic', 'Seiko', '{"data","cronometru","alarma"}', True,'./resurse/imagini/imagini_produse/Seiko_Kinetic_SMY151P1.jpg' ),
('Seiko kinetic 2', 'Ceas casual-elegant. Merge bine cu un costum!', 950.99, 42, 'barbati', 'kinetic', 'analogic', 'Seiko', '{"data","cronometru","alarma"}', True,'./resurse/imagini/imagini_produse/Seiko_SKA367P1_kinetic.jpg' ),
('Timex 1', 'Ceas casual-elegant pentru femei.', 1500.99, 35, 'femei', 'automatic', 'analogic', 'Timex', '{"data","cronometru","alarma"}', False,'./resurse/imagini/imagini_produse/Timex_1.jpg' ),
('Timex 2', 'Ceas casual-elegant pentru femei.', 1000.99, 32, 'femei', 'mecanic', 'analogic', 'Timex', '{"data","cronometru","alarma"}', False,'./resurse/imagini/imagini_produse/Timex_2.jpg' ),
('Timex 3', 'Ceas casual-elegant pentru femei.', 1500.99, 30, 'femei', 'kinetic', 'analogic', 'Timex', '{"data","cronometru","alarma"}', False,'./resurse/imagini/imagini_produse/Timex_3.jpg' )

