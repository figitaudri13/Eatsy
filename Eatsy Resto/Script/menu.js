

// Array untuk menyimpan data menu
const menuItems = [];

// Simpan data menu ke Local Storage
function saveToLocalStorage() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

// Menampilkan menu pada tabel
function displayMenu() {
    const menuTable = document.getElementById('menu-table');
    menuTable.innerHTML = ''; // Mengosongkan data tabel sebelum memperbarui

    menuItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${formatRupiah(item.price)}</td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;"></td>
            <td>
                <a href="edit-menu.html?id=${index}" class="edit-btn">Edit</a>
                <button class="delete" onclick="deleteMenu(${index})">Hapus</button>
            </td>
        `;
        menuTable.appendChild(row);
    });

    saveToLocalStorage(); // Simpan data ke Local Storage setiap kali ada perubahan
}


    function formatRupiah(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


// Tambah menu baru
document.getElementById('menu-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('menu-name').value;
    const price = document.getElementById('menu-price').value;
    const imageFile = document.getElementById('menu-image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageURL = event.target.result;

            // Tambahkan data menu baru ke array
            menuItems.push({
                name,
                price,
                image: imageURL
            });

            displayMenu(); // Perbarui tampilan menu
            document.getElementById('menu-form').reset(); // Reset form setelah submit
        };

        reader.readAsDataURL(imageFile);
    }
});

// Hapus menu
function deleteMenu(index) {
    if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
        menuItems.splice(index, 1); // Hapus item dari array
        displayMenu(); // Perbarui tampilan
    }
}



// Load awal saat halaman dimuat
window.onload = function () {
    // Muat data dari Local Storage jika tersedia
    const storedMenu = localStorage.getItem('menuItems');
    if (storedMenu) {
        menuItems.push(...JSON.parse(storedMenu)); // Tambahkan data ke array
    }
    displayMenu(); // Tampilkan menu
};

