document.addEventListener('DOMContentLoaded', function() {
  const addHostBtn = document.getElementById('addHostBtn');
  const addHostModal = document.getElementById('addHostModal');
  const closeBtns = document.querySelectorAll('.close');
  const addHostForm = document.getElementById('addHostForm');
  const hostTableBody = document.getElementById('hostTableBody');
  let editRowIndex = null;

  // Menampilkan data yang tersimpan di local storage ketika halaman dimuat
  displayStoredData();

  addHostBtn.addEventListener('click', function() {
    addHostModal.style.display = 'block';
  });

  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      addHostModal.style.display = 'none';
    });
  });

  window.addEventListener('click', function(event) {
    if (event.target == addHostModal) {
      addHostModal.style.display = 'none';
    }
  });

  addHostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const rowData = getFormData(addHostForm);
    if (editRowIndex !== null) {
      // Jika sedang dalam mode edit, lakukan update data
      updateRow(rowData);
      editRowIndex = null;
    } else {
      // Jika tidak dalam mode edit, tambahkan data baru
      appendRow(rowData);
    }
    saveData(); // Menyimpan data ke local storage
    addHostModal.style.display = 'none';
    addHostForm.reset();
  });

  function getFormData(form) {
    const formData = new FormData(form);
    const rowData = {};
    for (let pair of formData.entries()) {
      rowData[pair[0]] = pair[1];
    }
    return rowData;
  }

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

    // Menambahkan event listener untuk tombol edit dan delete
    const editBtn = newRow.querySelector('.editBtn');
    editBtn.addEventListener('click', function() {
      editRowIndex = newRow.rowIndex;
      populateEditForm(newRow);
      addHostModal.style.display = 'block';
    });

    const deleteBtn = newRow.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
      // Logika untuk menangani hapus data
      // Misalnya, menghapus baris dari tabel dan lokal storage
      newRow.remove();
      saveData();
    });
  }

  function populateEditForm(row) {
    const editHostForm = document.getElementById('addHostForm');
    editHostForm.elements['hostName'].value = row.cells[0].innerText;
    editHostForm.elements['accountStatus'].value = row.cells[1].innerText;
    editHostForm.elements['berlianBulanIni'].value = row.cells[2].innerText;
    editHostForm.elements['durasiLiveBulanIni'].value = row.cells[3].innerText;
    editHostForm.elements['hariBerlakuBulanIni'].value = row.cells[4].innerText;
    editHostForm.elements['targetBerlianDasar'].value = row.cells[5].innerText;
  }

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
