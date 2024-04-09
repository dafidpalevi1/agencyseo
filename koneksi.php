<?php
$servername = "localhost"; // Ganti dengan hostname MySQL Anda
$username = "username"; // Ganti dengan username MySQL Anda
$password = "password"; // Ganti dengan password MySQL Anda
$database = "nama_database"; // Ganti dengan nama database Anda

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
