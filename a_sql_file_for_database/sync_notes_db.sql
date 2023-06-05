-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 05 Haz 2023, 19:24:18
-- Sunucu sürümü: 10.4.27-MariaDB
-- PHP Sürümü: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `sync_notes_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notes`
--

CREATE TABLE `notes` (
  `id_notes` int(10) UNSIGNED NOT NULL,
  `head` text NOT NULL,
  `body` text NOT NULL,
  `stat` varchar(10) NOT NULL,
  `creation_date` text NOT NULL,
  `last_sync_date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Sync notes';

--
-- Tablo döküm verisi `notes`
--

INSERT INTO `notes` (`id_notes`, `head`, `body`, `stat`, `creation_date`, `last_sync_date`) VALUES
(1, 'Hafta sonu yapılacak şeyler', '-Ev temizliği<br>\n-Kedi maması alınacak\n<br>\n/* \n        arrow function\'da \"this\" anahtar kelimesi çalışmıyormuş\n        onun yerine \"event.currentTarget\" kullanılmalıymış.\n        $(\"h3\").on(\"mouseenter\", (event) => {\n            log($(event.currentTarget).attr(\"id\"));\n        }) \n    \n        $(\"h3\").on(\"mouseenter\", function(event) => {\n            log($(this).attr(\"id\"));\n        }) \n        */', 'normal', '05.06.23', '05.06.23'),
(2, 'Aceq Yapılacaklar Listesi şimdi buradan ooo', '1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'normal', '05.06.23', ''),
(3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Nullam eleifend blandit gravida. Vivamus mauris nibh, imperdiet nec finibus sed, pretium id sapien. Curabitur in ipsum ligula. Nullam feugiat imperdiet blandit. Nunc ultricies neque semper augue bibendum elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus est metus, venenatis vitae lectus sed, scelerisque volutpat dui. Morbi ut velit sem.', 'normal', '05.06.23', '');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_notes`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `notes`
--
ALTER TABLE `notes`
  MODIFY `id_notes` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
