
const menuData = [
    { category: "Steak & Meat", name: "Grilled Meat with Fresh Salad", price: 75000, image: "asset/gambar/istockphoto-1190330112-612x612.jpg" },
    { category: "Noodles", name: "Spicy Noodles with Shrimp", price: 55000, image: "asset/gambar/michele-blackwell-rAyCBQTH7ws-unsplash-removebg-preview.png" },
    { category: "Sandwiches", name: "Chicken Sandwich", price: 45000, image: "asset/gambar/fresh-tasty-sandwiches.jpg" },
    { category: "Drinks", name: "Iced Coffee", price: 25000, image: "asset/gambar/cold-coffee.jpg" },
];

// Data kategori
const categories = [
    { name: "All", icon: "🍽" },
    { name: "Steak & Meat", icon: "🍖" },
    { name: "Noodles", icon: "🍜" },
    { name: "Sandwiches", icon: "🥪" },
    { name: "Drinks", icon: "🥤" },
];

// Array untuk menyimpan pesanan
let orders = [];
let totalPrice = 0;

// Fungsi untuk merender kategori
function renderCategories() {
    const categoryContainer = document.querySelector(".categories"); // Sidebar kategori
    categoryContainer.innerHTML = ""; // Reset isi kategori

    // Menambahkan heading kategori
    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = "Menu";
    categoryContainer.appendChild(categoryHeading);

    // Membuat elemen <ul> untuk daftar kategori
    const categoryList = document.createElement("ul");
    categoryList.className = "category-list"; // Tambahkan class untuk styling

    // Render setiap kategori
    categories.forEach((category) => {
        const categoryItem = document.createElement("li");
        categoryItem.className = "category-item";
        categoryItem.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${category.name}</span>
        `;

        // Event klik untuk memfilter menu berdasarkan kategori
        categoryItem.addEventListener("click", () => filterMenuByCategory(category.name));

        categoryList.appendChild(categoryItem);
    });

    categoryContainer.appendChild(categoryList);
}

// Fungsi untuk memfilter menu berdasarkan kategori
function filterMenuByCategory(selectedCategory) {
    const filteredMenu =
        selectedCategory === "All"
            ? menuData // Tampilkan semua menu jika kategori "All" dipilih
            : menuData.filter((menuItem) => menuItem.category === selectedCategory);

    renderMenu(filteredMenu); // Render menu yang difilter
}

// Fungsi untuk memfilter menu berdasarkan pencarian
function filterMenu(searchTerm) {
    const menuItems = document.querySelectorAll('.item'); // Memilih elemen menu-item
    menuItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block'; // Menampilkan item jika nama cocok
        } else {
            item.style.display = 'none'; // Menyembunyikan item jika nama tidak cocok
        }
    });
}

// Menambahkan event listener pada search bar untuk memfilter menu
document.querySelector('.search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    filterMenu(searchTerm);
});


// Fungsi untuk merender menu ke halaman
function renderMenu(menuList = menuData) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = ""; // Reset isi menu

    menuList.forEach((menuItem) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item"; // Menambahkan kelas item untuk pencarian

        itemDiv.innerHTML = `
            <img src="${menuItem.image}" alt="${menuItem.name}">
            <h3>${menuItem.name}</h3>
            <p>Rp ${menuItem.price.toLocaleString()}</p>
            <button onclick="addToOrder('${menuItem.name}', ${menuItem.price}, '${menuItem.image}')">Order Now</button>
        `;

        menuContainer.appendChild(itemDiv);
    });
}

// Fungsi untuk menambahkan item ke pesanan
function addToOrder(itemName, price, image) {
    const existingOrder = orders.find((order) => order.name === itemName);
    if (existingOrder) {
        existingOrder.quantity += 1; // Tambahkan jumlah jika item sudah ada
    } else {
        orders.push({ name: itemName, price, quantity: 1, image }); // Tambahkan item baru
    }

    totalPrice += price; // Tambahkan harga ke total
    renderOrders();
}

// Fungsi untuk merender daftar pesanan
function renderOrders() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Reset daftar pesanan

    orders.forEach((order) => {
        const orderItem = document.createElement("li");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <img src="${order.image}" alt="${order.name}" class="order-item-img">
            <span class="order-item-name">${order.name} x${order.quantity}</span>
            <span class="order-item-price">Rp ${(order.price * order.quantity).toLocaleString()}</span>
        `;
        orderList.appendChild(orderItem);
    });

    // Update total harga
    document.getElementById("total-price").innerText = `Rp ${totalPrice.toLocaleString()}`;
}



// Konfirmasi pesanan
document.getElementById("confirm-order").addEventListener("click", () => {
    const tableNumber = document.getElementById('table-number').value;
    if (orders.length > 0) {
        if (tableNumber.trim() === "") {
            alert("Masukan Nomer Meja Anda"); // Validasi jika nomor meja belum terisi
            return;
        }

        

        // Menyimpan data pesanan dan nomor meja ke localStorage
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("totalPrice", totalPrice);
        localStorage.setItem("tableNumber", tableNumber);
        
        // Mengarahkan ke halaman pembayaran
        window.location.href = "payment.html"; // Menuju File Pembayaran
    } else {
        alert("No items in order.");
    }
});


// Inisialisasi
renderCategories();
renderMenu();

