<?php
// Ambil data dari tabel
$sql = "SELECT * FROM nama_tabel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data dari setiap baris
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Nama Host: " . $row["hostName"]. " - Status Akun: " . $row["accountStatus"]. "<br>";
    }
} else {
    echo "0 results";
}

// Tambah data ke dalam tabel
$sql = "INSERT INTO nama_tabel (hostName, accountStatus, berlianBulanIni, durasiLiveBulanIni, hariBerlakuBulanIni, targetBerlianDasar)
VALUES ('John Doe', 'Active', 100, 10, 30, 500)";

if ($conn->query($sql) === TRUE) {
    echo "Data baru berhasil ditambahkan";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Tutup koneksi
$conn->close();
?>
