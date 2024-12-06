
// Mengambil data menu dari Local Storage
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

// Mengambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const menuId = urlParams.get('id');

// Mengambil elemen form
const form = document.getElementById('edit-menu-form');
const nameInput = document.getElementById('edit-menu-name');
const priceInput = document.getElementById('edit-menu-price');
const imageInput = document.getElementById('edit-menu-image');

//form dengan data menu yang dipilih
const menuToEdit = menuItems[menuId];
nameInput.value = menuToEdit.name;
priceInput.value = menuToEdit.price;

// Function Untuk Menyimpan Perubahan
form.addEventListener('submit', function (e) {
    e.preventDefault();

    menuToEdit.name = nameInput.value;
    menuToEdit.price = priceInput.value;

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
            menuToEdit.image = event.target.result;

            localStorage.setItem('menuItems', JSON.stringify(menuItems)); // Simpan data
            alert('Perubahan berhasil disimpan!');
            window.location.href = 'menu-management.html'; // Kembali ke halaman utama
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        localStorage.setItem('menuItems', JSON.stringify(menuItems)); // Simpan data
        alert('Perubahan berhasil disimpan!');
        window.location.href = 'menu-management.html'; // Kembali ke halaman utama
    }
    
});


