-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 14 Haz 2023, 19:34:46
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
  `creation_date` date NOT NULL,
  `last_sync_date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Sync notes';

--
-- Tablo döküm verisi `notes`
--

INSERT INTO `notes` (`id_notes`, `head`, `body`, `stat`, `creation_date`, `last_sync_date`) VALUES
(165, 'Öğrenilecek dillerin listesi', '-İngilizce\n-Almanca\n-C++\n-Javascript\n-Nodejs\n-Go\n-PHP', 'normal', '2023-06-12', '2023-06-14|18:27:37'),
(166, 'Alışveriş Listesi', '-Mouse (tuşu bozuldu)\n-Bluetooth usb (gamepad\'i bağlamak için)\n-Bir şey daha vardı unuttum hatırlayınca geri yazacam. (Edit: hatırlamadı)\n', 'normal', '2023-06-13', '2023-06-14|19:17:29'),
(182, 'Sync Notes İçin Yapılacaklar', '-Tasarımını düzenle\n-Dil desteği ekle\n-Hataları bul ve düzelt ', 'delete', '2023-06-13', '2023-06-14|17:58:52'),
(183, 'Sevdiğim bazı kitaplar', '> Denemeler - Montaigne\n\n> Sokrates\'in Savunması, Devlet - Platon\n\n> İrade Terbiyesi - Jules Payot\n\n> Bilim İle Sohbet Popüler Bilim Yazıları - Celal Şengör', 'finish', '2023-06-14', '2023-06-14|15:43:13'),
(186, 'web technology <3', 'html + css(?) +\njs(jquery) + \nphp(?laravel)', 'delete', '2023-06-14', '2023-06-14|15:45:50'),
(192, 'Bir başlık yazın.', 'İçerik yazın.', 'normal', '2023-06-14', '2023-06-14|19:17:26'),
(193, 'Bir başlık yazın.', 'İçerik yazın.', 'normal', '2023-06-14', '2023-06-14|19:32:20');

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
  MODIFY `id_notes` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
