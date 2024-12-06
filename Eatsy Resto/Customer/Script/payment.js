// Ambil data pesanan dari localStorage
document.addEventListener("DOMContentLoaded", () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedTotalPrice = parseInt(localStorage.getItem("totalPrice"), 10) || 0;
    const storedTableNumber = localStorage.getItem("tableNumber") || "";

    if (storedOrders.length > 0) {
        renderOrders(storedOrders);
        document.getElementById("total-price").innerText = `Rp ${storedTotalPrice.toLocaleString()}`;
        document.getElementById("table-number").value = storedTableNumber;
    } else {
        alert("No orders found.");
        window.location.href = "index.html"; // Kembali ke halaman utama jika tidak ada pesanan
    }
});

// Fungsi untuk merender daftar pesanan di halaman pembayaran
function renderOrders(orders) {
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
}

// Fungsi untuk membersihkan pesanan setelah pembayaran berhasil
function clearOrders() {
    localStorage.removeItem("orders");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("tableNumber");
    alert("Pesanan dan Pembayaran Terkonfirmasi");
    window.location.href = "index.html"; // Kembali ke halaman utama setelah pembayaran
}

// Event Listener untuk tombol konfirmasi pembayaran dan QRIS
document.querySelectorAll(".payment-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert("Pembayaran via QRIS Terkonfirmasi");
        clearOrders(); // Bersihkan pesanan setelah pembayaran QRIS berhasil
    });
});

document.querySelectorAll(".confirm-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        clearOrders();
    });
});
