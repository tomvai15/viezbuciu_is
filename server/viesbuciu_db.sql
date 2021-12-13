-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2021 m. Grd 01 d. 10:03
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viesbuciu_db`
--

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `administratoriai`
--

CREATE TABLE `administratoriai` (
  `yra_savininkas` tinyint(1) NOT NULL,
  `id_Naudotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `darbo_sutarties_tipai`
--

CREATE TABLE `darbo_sutarties_tipai` (
  `id_Darbo_sutarties_tipas` int(11) NOT NULL,
  `name` char(22) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `darbo_sutarties_tipai`
--

INSERT INTO `darbo_sutarties_tipai` (`id_Darbo_sutarties_tipas`, `name`) VALUES
(1, 'Terminuota'),
(2, 'Neterminuota');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `darbuotojai`
--

CREATE TABLE `darbuotojai` (
  `id_Naudotojas` int(11) NOT NULL,
  `asmens_kodas` varchar(12) COLLATE utf8_lithuanian_ci NOT NULL,
  `atlyginimas` double NOT NULL,
  `telefono_numeris` varchar(15) COLLATE utf8_lithuanian_ci NOT NULL,
  `gimimo_data` date NOT NULL,
  `idarbinimo_data` date NOT NULL,
  `darbo_sutartis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `darbuotojai`
--

INSERT INTO `darbuotojai` (`id_Naudotojas`, `asmens_kodas`, `atlyginimas`, `telefono_numeris`, `gimimo_data`, `idarbinimo_data`, `darbo_sutartis`) VALUES
(18, '12531', 69, '86955226', '2021-11-01', '2021-11-01', 1),
(19, '435345453', 500, '345435', '2021-11-01', '2021-11-01', 2);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `kambariai`
--

CREATE TABLE `kambariai` (
  `aukstas` int(11) NOT NULL,
  `lovu_skaicius` int(11) NOT NULL,
  `aprasymas` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `yra_internetas` tinyint(1) NOT NULL,
  `kambario_dydis` double NOT NULL,
  `numeris` int(11) NOT NULL,
  `yra_televizorius` tinyint(1) NOT NULL,
  `yra_seifas` tinyint(1) NOT NULL,
  `yra_vonia` tinyint(1) NOT NULL,
  `yra_mini_baras` tinyint(1) NOT NULL,
  `kaina` double NOT NULL,
  `islaikymo_islaidos` double NOT NULL,
  `kambario_tipas` int(11) NOT NULL,
  `vaizdas` int(11) NOT NULL,
  `id_Kambarys` int(11) NOT NULL,
  `fk_Registratūros_darbuotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `kambario_tipai`
--

CREATE TABLE `kambario_tipai` (
  `id_Kambario_tipas` int(11) NOT NULL,
  `name` char(12) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `kambario_tipai`
--

INSERT INTO `kambario_tipai` (`id_Kambario_tipas`, `name`) VALUES
(1, 'ekonominis'),
(2, 'standartinis'),
(3, 'prabangus');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `klientai`
--

CREATE TABLE `klientai` (
  `banko_saskaita` varchar(20) COLLATE utf8_lithuanian_ci NOT NULL,
  `korteles_galiojimo_data` date NOT NULL,
  `CVV_numeris` varchar(3) COLLATE utf8_lithuanian_ci NOT NULL,
  `prisijungimo_vardas` varchar(20) COLLATE utf8_lithuanian_ci NOT NULL,
  `id_Naudotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `klientai`
--

INSERT INTO `klientai` (`banko_saskaita`, `korteles_galiojimo_data`, `CVV_numeris`, `prisijungimo_vardas`, `id_Naudotojas`) VALUES
('23156156', '2021-11-01', '321', 'ugne', 17);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `maisto_uzsakymai`
--

CREATE TABLE `maisto_uzsakymai` (
  `kiekis` int(11) NOT NULL,
  `pristatymo_data` datetime NOT NULL,
  `pristatymo_tipas` int(11) NOT NULL,
  `id_Maisto_uzsakymas` int(11) NOT NULL,
  `fk_Meniu_irasas` int(11) NOT NULL,
  `fk_Rezervacija` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `meniu_irasai`
--

CREATE TABLE `meniu_irasai` (
  `pavadinimas` varchar(30) COLLATE utf8_lithuanian_ci NOT NULL,
  `aprasymas` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `kaina` double NOT NULL,
  `savikaina` double NOT NULL,
  `yra_veganiskas` tinyint(1) NOT NULL,
  `tipas` int(11) NOT NULL,
  `porcijos_dydis` int(11) NOT NULL,
  `id_Meniu_irasas` int(11) NOT NULL,
  `fk_Virtuves_darbuotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `meniu_iraso_tipai`
--

CREATE TABLE `meniu_iraso_tipai` (
  `id_Meniu_iraso_tipas` int(11) NOT NULL,
  `name` char(22) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `meniu_iraso_tipai`
--

INSERT INTO `meniu_iraso_tipai` (`id_Meniu_iraso_tipas`, `name`) VALUES
(1, 'užkandis'),
(2, 'pagrindinis patiekalas'),
(3, 'gėrimas');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `naudotojai`
--

CREATE TABLE `naudotojai` (
  `el_pastas` varchar(50) COLLATE utf8_lithuanian_ci NOT NULL,
  `vardas` varchar(50) COLLATE utf8_lithuanian_ci NOT NULL,
  `pavarde` varchar(50) COLLATE utf8_lithuanian_ci NOT NULL,
  `slaptazodis` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `role` int(11) NOT NULL,
  `id_Naudotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `naudotojai`
--

INSERT INTO `naudotojai` (`el_pastas`, `vardas`, `pavarde`, `slaptazodis`, `role`, `id_Naudotojas`) VALUES
('admin@gmail.com', 'Tomas', 'Vainoris', '$2a$08$MVdGBE2Yh5/RQEhaojvZke4us7Xt3ygxwYu55Yubm3truOnem5bwy', 1, 4),
('gokas@gmail.com', 'San', 'Gokas', '$2a$08$Sv.ow5ObGFiO9WjpVhmcTOEoTZGwCNO/Op1wWAAf0hdKX866Ztrxi', 2, 16),
('ugne@gmail.com', 'Ugnė', 'Glinskyte', '$2a$08$9KtW2KYuYOdTSlgm41dFtu.aBniL0mZcTcp0L798VoS/FaBee76l2', 2, 17),
('paulius@gmail.com', 'Paulius', 'Gilvydis', '$2a$08$YmItiF9nJtz27uJlPGyk4OKArnwOKWMNY5psEiTvcH3xQX4SnrT.K', 3, 18),
('pauliukas@gmail.com', 'Paulius', 'Petrauskas', '$2a$08$l7XfNgsdYFc5dLILdOZxbOiUdNPjqF1.hMMxCNfXrfgY8wGERoygm', 4, 19);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `pamainos_tipai`
--

CREATE TABLE `pamainos_tipai` (
  `id_Pamainos_tipas` int(11) NOT NULL,
  `name` char(7) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `pamainos_tipai`
--

INSERT INTO `pamainos_tipai` (`id_Pamainos_tipas`, `name`) VALUES
(1, 'dieninė'),
(2, 'naktinė');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `porcijos_tipai`
--

CREATE TABLE `porcijos_tipai` (
  `id_Porcijos_tipas` int(11) NOT NULL,
  `name` char(6) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `porcijos_tipai`
--

INSERT INTO `porcijos_tipai` (`id_Porcijos_tipas`, `name`) VALUES
(1, 'didelė'),
(2, 'maža');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `pristatymo_tipai`
--

CREATE TABLE `pristatymo_tipai` (
  `id_Pristatymo_tipas` int(11) NOT NULL,
  `name` char(9) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `pristatymo_tipai`
--

INSERT INTO `pristatymo_tipai` (`id_Pristatymo_tipas`, `name`) VALUES
(1, 'prie durų'),
(2, 'kavinėje');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `registraturos_darbuotojai`
--

CREATE TABLE `registraturos_darbuotojai` (
  `darbo_stalo_numeris` int(11) NOT NULL,
  `manegeris` tinyint(1) NOT NULL,
  `etatas` double NOT NULL,
  `id_Naudotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `registraturos_darbuotojai`
--

INSERT INTO `registraturos_darbuotojai` (`darbo_stalo_numeris`, `manegeris`, `etatas`, `id_Naudotojas`) VALUES
(69, 0, 1, 18);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `rezervacijos`
--

CREATE TABLE `rezervacijos` (
  `pradzia` date NOT NULL,
  `pabaiga` date NOT NULL,
  `lovu_skaicius` int(11) NOT NULL,
  `pusryciai` tinyint(1) NOT NULL,
  `kambario_tipas` int(11) NOT NULL,
  `id_Rezervacija` int(11) NOT NULL,
  `fk_Klientas` int(11) NOT NULL,
  `fk_Kambarys` int(11) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `roles`
--

CREATE TABLE `roles` (
  `id_Role` int(11) NOT NULL,
  `name` char(16) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `roles`
--

INSERT INTO `roles` (`id_Role`, `name`) VALUES
(1, 'administratorius'),
(2, 'klientas'),
(3, 'r_darbuotojas'),
(4, 'v_darbuotojas');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `vaizdo_tipai`
--

CREATE TABLE `vaizdo_tipai` (
  `id_Vaizdo_tipas` int(11) NOT NULL,
  `name` char(12) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `vaizdo_tipai`
--

INSERT INTO `vaizdo_tipai` (`id_Vaizdo_tipas`, `name`) VALUES
(1, 'į gatvę'),
(2, 'į upę'),
(3, 'į senamiestį'),
(4, 'į parką');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `virtuves_darbuotojai`
--

CREATE TABLE `virtuves_darbuotojai` (
  `pareigos` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `pamaina` int(11) NOT NULL,
  `id_Naudotojas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `virtuves_darbuotojai`
--

INSERT INTO `virtuves_darbuotojai` (`pareigos`, `pamaina`, `id_Naudotojas`) VALUES
('Master chef', 2, 19);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administratoriai`
--
ALTER TABLE `administratoriai`
  ADD PRIMARY KEY (`id_Naudotojas`);

--
-- Indexes for table `darbo_sutarties_tipai`
--
ALTER TABLE `darbo_sutarties_tipai`
  ADD PRIMARY KEY (`id_Darbo_sutarties_tipas`);

--
-- Indexes for table `darbuotojai`
--
ALTER TABLE `darbuotojai`
  ADD PRIMARY KEY (`id_Naudotojas`),
  ADD KEY `darbo_sutartis` (`darbo_sutartis`);

--
-- Indexes for table `kambariai`
--
ALTER TABLE `kambariai`
  ADD PRIMARY KEY (`id_Kambarys`),
  ADD KEY `kambario_tipas` (`kambario_tipas`),
  ADD KEY `vaizdas` (`vaizdas`),
  ADD KEY `kuria_kambari` (`fk_Registratūros_darbuotojas`);

--
-- Indexes for table `kambario_tipai`
--
ALTER TABLE `kambario_tipai`
  ADD PRIMARY KEY (`id_Kambario_tipas`);

--
-- Indexes for table `klientai`
--
ALTER TABLE `klientai`
  ADD PRIMARY KEY (`id_Naudotojas`);

--
-- Indexes for table `maisto_uzsakymai`
--
ALTER TABLE `maisto_uzsakymai`
  ADD PRIMARY KEY (`id_Maisto_uzsakymas`),
  ADD KEY `pristatymo_tipas` (`pristatymo_tipas`),
  ADD KEY `įeina` (`fk_Meniu_irasas`),
  ADD KEY `užsako` (`fk_Rezervacija`);

--
-- Indexes for table `meniu_irasai`
--
ALTER TABLE `meniu_irasai`
  ADD PRIMARY KEY (`id_Meniu_irasas`),
  ADD KEY `tipas` (`tipas`),
  ADD KEY `porcijos_dydis` (`porcijos_dydis`),
  ADD KEY `kuria_irasa` (`fk_Virtuves_darbuotojas`);

--
-- Indexes for table `meniu_iraso_tipai`
--
ALTER TABLE `meniu_iraso_tipai`
  ADD PRIMARY KEY (`id_Meniu_iraso_tipas`);

--
-- Indexes for table `naudotojai`
--
ALTER TABLE `naudotojai`
  ADD PRIMARY KEY (`id_Naudotojas`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `pamainos_tipai`
--
ALTER TABLE `pamainos_tipai`
  ADD PRIMARY KEY (`id_Pamainos_tipas`);

--
-- Indexes for table `porcijos_tipai`
--
ALTER TABLE `porcijos_tipai`
  ADD PRIMARY KEY (`id_Porcijos_tipas`);

--
-- Indexes for table `pristatymo_tipai`
--
ALTER TABLE `pristatymo_tipai`
  ADD PRIMARY KEY (`id_Pristatymo_tipas`);

--
-- Indexes for table `registraturos_darbuotojai`
--
ALTER TABLE `registraturos_darbuotojai`
  ADD PRIMARY KEY (`id_Naudotojas`);

--
-- Indexes for table `rezervacijos`
--
ALTER TABLE `rezervacijos`
  ADD PRIMARY KEY (`id_Rezervacija`),
  ADD KEY `kambario_tipas` (`kambario_tipas`),
  ADD KEY `kuria_rezervacija` (`fk_Klientas`),
  ADD KEY `nurodomas` (`fk_Kambarys`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_Role`);

--
-- Indexes for table `vaizdo_tipai`
--
ALTER TABLE `vaizdo_tipai`
  ADD PRIMARY KEY (`id_Vaizdo_tipas`);

--
-- Indexes for table `virtuves_darbuotojai`
--
ALTER TABLE `virtuves_darbuotojai`
  ADD PRIMARY KEY (`id_Naudotojas`),
  ADD KEY `pamaina` (`pamaina`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kambariai`
--
ALTER TABLE `kambariai`
  MODIFY `id_Kambarys` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maisto_uzsakymai`
--
ALTER TABLE `maisto_uzsakymai`
  MODIFY `id_Maisto_uzsakymas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meniu_irasai`
--
ALTER TABLE `meniu_irasai`
  MODIFY `id_Meniu_irasas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `naudotojai`
--
ALTER TABLE `naudotojai`
  MODIFY `id_Naudotojas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `rezervacijos`
--
ALTER TABLE `rezervacijos`
  MODIFY `id_Rezervacija` int(11) NOT NULL AUTO_INCREMENT;

--
-- Apribojimai eksportuotom lentelėm
--

--
-- Apribojimai lentelei `administratoriai`
--
ALTER TABLE `administratoriai`
  ADD CONSTRAINT `administratoriai_ibfk_1` FOREIGN KEY (`id_Naudotojas`) REFERENCES `naudotojai` (`id_Naudotojas`);

--
-- Apribojimai lentelei `darbuotojai`
--
ALTER TABLE `darbuotojai`
  ADD CONSTRAINT `darbuotojai_ibfk_1` FOREIGN KEY (`darbo_sutartis`) REFERENCES `darbo_sutarties_tipai` (`id_Darbo_sutarties_tipas`),
  ADD CONSTRAINT `darbuotojai_ibfk_2` FOREIGN KEY (`id_Naudotojas`) REFERENCES `naudotojai` (`id_Naudotojas`);

--
-- Apribojimai lentelei `kambariai`
--
ALTER TABLE `kambariai`
  ADD CONSTRAINT `kambariai_ibfk_1` FOREIGN KEY (`kambario_tipas`) REFERENCES `kambario_tipai` (`id_Kambario_tipas`),
  ADD CONSTRAINT `kambariai_ibfk_2` FOREIGN KEY (`vaizdas`) REFERENCES `vaizdo_tipai` (`id_Vaizdo_tipas`),
  ADD CONSTRAINT `kuria_kambari` FOREIGN KEY (`fk_Registratūros_darbuotojas`) REFERENCES `registraturos_darbuotojai` (`id_Naudotojas`);

--
-- Apribojimai lentelei `klientai`
--
ALTER TABLE `klientai`
  ADD CONSTRAINT `klientai_ibfk_1` FOREIGN KEY (`id_Naudotojas`) REFERENCES `naudotojai` (`id_Naudotojas`);

--
-- Apribojimai lentelei `maisto_uzsakymai`
--
ALTER TABLE `maisto_uzsakymai`
  ADD CONSTRAINT `maisto_uzsakymai_ibfk_1` FOREIGN KEY (`pristatymo_tipas`) REFERENCES `pristatymo_tipai` (`id_Pristatymo_tipas`),
  ADD CONSTRAINT `užsako` FOREIGN KEY (`fk_Rezervacija`) REFERENCES `rezervacijos` (`id_Rezervacija`),
  ADD CONSTRAINT `įeina` FOREIGN KEY (`fk_Meniu_irasas`) REFERENCES `meniu_irasai` (`id_Meniu_irasas`);

--
-- Apribojimai lentelei `meniu_irasai`
--
ALTER TABLE `meniu_irasai`
  ADD CONSTRAINT `kuria_irasa` FOREIGN KEY (`fk_Virtuves_darbuotojas`) REFERENCES `virtuves_darbuotojai` (`id_Naudotojas`),
  ADD CONSTRAINT `meniu_irasai_ibfk_1` FOREIGN KEY (`tipas`) REFERENCES `meniu_iraso_tipai` (`id_Meniu_iraso_tipas`),
  ADD CONSTRAINT `meniu_irasai_ibfk_2` FOREIGN KEY (`porcijos_dydis`) REFERENCES `porcijos_tipai` (`id_Porcijos_tipas`);

--
-- Apribojimai lentelei `naudotojai`
--
ALTER TABLE `naudotojai`
  ADD CONSTRAINT `naudotojai_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id_Role`);

--
-- Apribojimai lentelei `registraturos_darbuotojai`
--
ALTER TABLE `registraturos_darbuotojai`
  ADD CONSTRAINT `registraturos_darbuotojai_ibfk_1` FOREIGN KEY (`id_Naudotojas`) REFERENCES `darbuotojai` (`id_Naudotojas`);

--
-- Apribojimai lentelei `rezervacijos`
--
ALTER TABLE `rezervacijos`
  ADD CONSTRAINT `kuria_rezervacija` FOREIGN KEY (`fk_Klientas`) REFERENCES `klientai` (`id_Naudotojas`),
  ADD CONSTRAINT `nurodomas` FOREIGN KEY (`fk_Kambarys`) REFERENCES `kambariai` (`id_Kambarys`),
  ADD CONSTRAINT `rezervacijos_ibfk_1` FOREIGN KEY (`kambario_tipas`) REFERENCES `kambario_tipai` (`id_Kambario_tipas`);

--
-- Apribojimai lentelei `virtuves_darbuotojai`
--
ALTER TABLE `virtuves_darbuotojai`
  ADD CONSTRAINT `virtuves_darbuotojai_ibfk_1` FOREIGN KEY (`pamaina`) REFERENCES `pamainos_tipai` (`id_Pamainos_tipas`),
  ADD CONSTRAINT `virtuves_darbuotojai_ibfk_2` FOREIGN KEY (`id_Naudotojas`) REFERENCES `darbuotojai` (`id_Naudotojas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
