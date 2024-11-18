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
    const categoryContainer = document.querySelector(".categories");
    categoryContainer.innerHTML = ""; // Reset isi kategori

    // Tambahkan heading kategori
    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = "Menu";
    categoryContainer.appendChild(categoryHeading);

    // Buat elemen <ul> untuk daftar kategori
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
    const menuItems = document.querySelectorAll(".item"); // Memilih elemen menu-item
    menuItems.forEach((item) => {
        const itemName = item.querySelector("h3").textContent.toLowerCase();
        if (itemName.includes(searchTerm.toLowerCase())) {
            item.style.display = "block"; // Menampilkan item jika nama cocok
        } else {
            item.style.display = "none"; // Menyembunyikan item jika nama tidak cocok
        }
    });
}

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

    document.getElementById("total-price").innerText = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menambahkan item ke pesanan
function addToOrder(name, price, image) {
    const existingOrder = orders.find((order) => order.name === name);
    if (existingOrder) {
        existingOrder.quantity += 1;
    } else {
        orders.push({ name, price, image, quantity: 1 });
    }

    totalPrice += price;
    renderOrders();
    saveToLocalStorage();
}

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("tableNumber", document.getElementById("table-number").value);
}

// Ambil data pesanan dari localStorage
document.addEventListener("DOMContentLoaded", () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedTotalPrice = parseInt(localStorage.getItem("totalPrice"), 10) || 0;
    const storedTableNumber = localStorage.getItem("tableNumber") || "";

    if (storedOrders.length > 0) {
        orders = storedOrders;
        totalPrice = storedTotalPrice;
        document.getElementById("total-price").innerText = `Rp ${totalPrice.toLocaleString()}`;
        document.getElementById("table-number").value = storedTableNumber;
        renderOrders();
    }

    renderCategories(); // Render sidebar kategori
    renderMenu(); // Render daftar menu

    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value;
        filterMenu(searchTerm); // Filter menu saat pencarian dilakukan
    });
});

//untuk konfirmasi pembayaran

        document.querySelectorAll(".payment-btn").forEach(btn => {
            btn.addEventListener("click",()=>{
                alert("Payment via QRIS initiated!");

            });
        });
        document.querySelectorAll(".confirm-btn").forEach(btn => {
            btn.addEventListener("click",()=>{
                alert("Order Confirmed");

            });
        });


