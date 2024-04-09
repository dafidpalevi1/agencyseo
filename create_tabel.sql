CREATE TABLE IF NOT EXISTS nama_tabel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hostName VARCHAR(255) NOT NULL,
    accountStatus VARCHAR(50) NOT NULL,
    berlianBulanIni INT NOT NULL,
    durasiLiveBulanIni INT NOT NULL,
    hariBerlakuBulanIni INT NOT NULL,
    targetBerlianDasar INT NOT NULL
);
