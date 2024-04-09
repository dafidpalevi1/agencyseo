document.addEventListener('DOMContentLoaded', function() {
  const addHostBtn = document.getElementById('addHostBtn');
  const addHostModal = document.getElementById('addHostModal');
  const closeBtns = document.querySelectorAll('.close');
  const addHostForm = document.getElementById('addHostForm');
  const hostTableBody = document.getElementById('hostTableBody');
  let editRowIndex = null;

  // Menampilkan data yang tersimpan di local storage ketika halaman dimuat
  displayStoredData();

  // Tambahkan event listener untuk tombol tambah host
  addHostBtn.addEventListener('click', function() {
    addHostModal.style.display = 'block';
  });

  // Tambahkan event listener untuk tombol close modal
  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      addHostModal.style.display = 'none';
    });
  });

  // Tambahkan event listener untuk menutup modal ketika area luar modal diklik
  window.addEventListener('click', function(event) {
    if (event.target == addHostModal) {
      addHostModal.style.display = 'none';
    }
  });

  // Tambahkan event listener untuk submit form tambah host
  addHostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const rowData = getFormData(addHostForm);
    if (editRowIndex !== null) {
      updateRow(rowData);
      editRowIndex = null;
    } else {
      appendRow(rowData);
    }
    saveData();
    addHostModal.style.display = 'none';
    addHostForm.reset();
  });

  // Fungsi untuk mendapatkan data dari form
  function getFormData(form) {
    const formData = new FormData(form);
    const rowData = {};
    for (let pair of formData.entries()) {
      rowData[pair[0]] = pair[1];
    }
    return rowData;
  }

  // Fungsi untuk menambahkan baris ke tabel
  function appendRow(data) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${data.hostName}</td>
      <td>${data.accountStatus}</td>
      <td>${data.berlianBulanIni}</td>
      <td>${data.durasiLiveBulanIni}</td>
      <td>${data.hariBerlakuBulanIni}</td>
      <td>${data.targetBerlianDasar}</td>
      <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;
    hostTableBody.appendChild(newRow);

    // Tambahkan event listener untuk tombol edit dan delete
    newRow.querySelector('.editBtn').addEventListener('click', function() {
      editRowIndex = newRow.rowIndex;
      populateEditForm(newRow);
      addHostModal.style.display = 'block';
    });

    newRow.querySelector('.deleteBtn').addEventListener('click', function() {
      newRow.remove();
      saveData();
    });
  }

  // Fungsi untuk mengisi form edit
  function populateEditForm(row) {
    const editHostForm = document.getElementById('addHostForm');
    editHostForm.elements['hostName'].value = row.cells[0].innerText;
    editHostForm.elements['accountStatus'].value = row.cells[1].innerText;
    editHostForm.elements['berlianBulanIni'].value = row.cells[2].innerText;
    editHostForm.elements['durasiLiveBulanIni'].value = row.cells[3].innerText;
    editHostForm.elements['hariBerlakuBulanIni'].value = row.cells[4].innerText;
    editHostForm.elements['targetBerlianDasar'].value = row.cells[5].innerText;
  }

  // Fungsi untuk memperbarui baris dalam tabel
  function updateRow(data) {
    const hostTable = document.getElementById('hostTable');
    const editRow = hostTable.rows[editRowIndex];
    editRow.cells[0].innerText = data.hostName;
    editRow.cells[1].innerText = data.accountStatus;
    editRow.cells[2].innerText = data.berlianBulanIni;
    editRow.cells[3].innerText = data.durasiLiveBulanIni;
    editRow.cells[4].innerText = data.hariBerlakuBulanIni;
    editRow.cells[5].innerText = data.targetBerlianDasar;
  }

  // Fungsi untuk menyimpan data ke local storage
  function saveData() {
    const rows = hostTableBody.querySelectorAll('tr');
    const data = [];
    rows.forEach(function(row) {
      const rowData = {
        hostName: row.cells[0].innerText,
        accountStatus: row.cells[1].innerText,
        berlianBulanIni: row.cells[2].innerText,
        durasiLiveBulanIni: row.cells[3].innerText,
        hariBerlakuBulanIni: row.cells[4].innerText,
        targetBerlianDasar: row.cells[5].innerText
      };
      data.push(rowData);
    });
    localStorage.setItem('hostData', JSON.stringify(data));
  }

  // Fungsi untuk menampilkan data dari local storage
  function displayStoredData() {
    const storedData = localStorage.getItem('hostData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      parsedData.forEach(function(data) {
        appendRow(data);
      });
    }
  }
});
