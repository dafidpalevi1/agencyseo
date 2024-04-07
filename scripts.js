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
// Fungsi untuk mengambil data dari API
async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://example-api.com/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Fungsi untuk mengirim data ke API
async function sendDataToAPI(data) {
  try {
    const response = await fetch('https://example-api.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Jika diperlukan otorisasi, Anda juga dapat menambahkan header Authorization di sini
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Failed to send data');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending data:', error);
    return null;
  }
}

// Fungsi untuk memuat data dari API dan menampilkannya di tabel
async function loadDataAndDisplay() {
  const data = await fetchDataFromAPI();
  if (data) {
    // Hapus semua baris tabel sebelum menambahkan data baru
    document.getElementById('hostTableBody').innerHTML = '';
    // Tambahkan data ke tabel
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.hostName}</td>
        <td>${item.accountStatus}</td>
        <td>${item.berlianBulanIni}</td>
        <td>${item.durasiLiveBulanIni}</td>
        <td>${item.hariBerlakuBulanIni}</td>
        <td>${item.targetBerlianDasar}</td>
        <td>
          <button onclick="editHost(${item.id})">Edit</button>
          <button onclick="deleteHost(${item.id})">Delete</button>
        </td>
      `;
      document.getElementById('hostTableBody').appendChild(row);
    });
  }
}

// Fungsi untuk menambahkan atau mengedit data
async function saveData() {
  const formData = {
    hostName: document.getElementById('hostName').value,
    accountStatus: document.getElementById('accountStatus').value,
    berlianBulanIni: document.getElementById('berlianBulanIni').value,
    durasiLiveBulanIni: document.getElementById('durasiLiveBulanIni').value,
    hariBerlakuBulanIni: document.getElementById('hariBerlakuBulanIni').value,
    targetBerlianDasar: document.getElementById('targetBerlianDasar').value
  };

  try {
    // Kirim data ke API
    const response = await sendDataToAPI(formData);
    if (response) {
      // Jika berhasil, perbarui tampilan dan muat ulang data
      loadDataAndDisplay();
      // Tutup modal
      document.getElementById('addHostModal').style.display = 'none';
      // Kosongkan form
      document.getElementById('addHostForm').reset();
    } else {
      console.error('Failed to save data');
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Fungsi untuk mengedit data host berdasarkan ID
async function editHost(hostId) {
  // Dapatkan data host dari API berdasarkan ID
  const data = await fetchDataFromAPI();
  if (data) {
    // Temukan data host dengan ID yang sesuai
    const hostData = data.find(item => item.id === hostId);
    if (hostData) {
      // Isi form edit dengan data host
      document.getElementById('editRowIndex').value = hostId;
      document.getElementById('editHostName').value = hostData.hostName;
      document.getElementById('editAccountStatus').value = hostData.accountStatus;
      document.getElementById('editBerlianBulanIni').value = hostData.berlianBulanIni;
      document.getElementById('editDurasiLiveBulanIni').value = hostData.durasiLiveBulanIni;
      document.getElementById('editHariBerlakuBulanIni').value = hostData.hariBerlakuBulanIni;
      document.getElementById('editTargetBerlianDasar').value = hostData.targetBerlianDasar;
      // Tampilkan modal edit host
      document.getElementById('editHostModal').style.display = 'block';
    } else {
      console.error('Host data not found');
    }
  }
}

// Fungsi untuk menyimpan perubahan data yang diedit
async function saveEditedData() {
  const rowIndex = document.getElementById('editRowIndex').value;
  const editedData = {
    id: rowIndex,
    hostName: document.getElementById('editHostName').value,
    accountStatus: document.getElementById('editAccountStatus').value,
    berlianBulanIni: document.getElementById('editBerlianBulanIni').value,
    durasiLiveBulanIni: document.getElementById('editDurasiLiveBulanIni').value,
    hariBerlakuBulanIni: document.getElementById('editHariBerlakuBulanIni').value,
    targetBerlianDasar: document.getElementById('editTargetBerlianDasar').value
  };

  try {
    // Kirim perubahan data ke API
    const response = await sendDataToAPI(editedData);
    if (response) {
      // Jika berhasil, perbarui tampilan dan muat ulang data
      loadDataAndDisplay();
      // Tutup modal edit
      document.getElementById('editHostModal').style.display = 'none';
    } else {
      console.error('Failed to save edited data');
    }
  } catch (error) {
    console.error('Error saving edited data:', error);
  }
}

// Fungsi untuk menghapus data host berdasarkan ID
async function deleteHost(hostId) {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    try {
      // Kirim permintaan penghapusan ke API
      const response = await fetch(`https://example-api.com/data/${hostId}`, {
        method: 'DELETE'
        // Jika diperlukan otorisasi, tambahkan header Authorization di sini
      });
      if (response.ok) {
        // Jika berhasil, perbarui tampilan dan muat ulang data
        loadDataAndDisplay();
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
}

// Ketika halaman dimuat, muat data dan tampilkan
window.addEventListener('DOMContentLoaded', () => {
  loadDataAndDisplay();
});
