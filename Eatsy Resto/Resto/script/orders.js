// Data Pesanan
const orders = [
    {
        id: 1,
        customerName: 'John Doe',
        tableNumber: '12',
        totalPrice: 200000,
        menuItems: [
            { name: 'Spaghetti', price: 50000},
            { name: 'Pizza', price: 150000}
        ],
        status: 'processing' // Status pesanan
    },
   {
        id: 2,
        customerName: 'Jane Smith',
        tableNumber: '5',
        totalPrice: 150000,
        menuItems: [
            { name: 'Pizza', price: 70000, },
            { name: 'Cold Coffe', price: 20000, }
        ],
        status: 'completed' // Status pesanan
    }
];

// Format Harga Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function calculateTotalPrice(menuItems) {
    return menuItems.reduce((total, item) => total + item.price, 0);
}

// Tampilkan Daftar Pesanan per Tabel
function displayOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Clear daftar pesanan

    orders.forEach(order => {
        // Jumlah Harga
        order.totalPrice = calculateTotalPrice(order.menuItems);

        const orderTable = document.createElement('table');
        orderTable.classList.add('order-table');
        
        let itemsHTML = '';
        order.menuItems.forEach(item => {
            itemsHTML += `
                <tr>
                    <td>${order.tableNumber}</td>
                    <td>${order.customerName}</td>
                    <td>${item.name}</td>
                    <td>${formatRupiah(item.price)}</td>
                </tr>
            `;
        });

        orderTable.innerHTML = `
            <thead>
                <tr>
                    <th colspan="3"><strong>Pesanan #${order.id}</strong></th>
                </tr>
                <tr>
                    <th>Nomor Meja</th>
                    <th>Nama Pemesan</th>
                    <th>Menu</th>
                    <th>Harga</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
                <tr>
                    <td colspan="3"><strong>Total:</strong></td>
                    <td><strong>${formatRupiah(order.totalPrice)}</strong></td>
                </tr>
            </tbody>
        `;

        const actionRow = document.createElement('tr');
        actionRow.innerHTML = `
            <td colspan="3">
                <span class="order-status ${order.status}">${order.status === 'processing' ? 'Di Proses' : 'Selesai'}</span>
                <button onclick="viewOrderDetail(${order.id})">Lihat Detail</button>
                <button onclick="changeOrderStatus(${order.id})">${order.status === 'processing' ? 'Pesanan Selesai' : 'Pesanan Di Proses'}</button>
            </td>
        `;
        orderTable.appendChild(actionRow);

        orderList.appendChild(orderTable);
    });
}

// Lihat Detail Pesanan
function viewOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);

    if (order) {
        // Hitung ulang totalPrice
        order.totalPrice = calculateTotalPrice(order.menuItems);

        const orderDetail = document.getElementById('order-detail');
        let itemsHTML = '';
        order.menuItems.forEach(item => {
            itemsHTML += `
                <div>
                    <img src="${item.image || ''}" alt="${item.name}" style="width: 100px; height: auto; border-radius: 5px;">
                    <p><strong>${item.name}</strong>: ${formatRupiah(item.price)}</p>
                </div>
            `;
        });

        orderDetail.innerHTML = `
            <p><strong>Nomor Pesanan:</strong> #${order.id}</p>
            <p><strong>Nama Pemesan:</strong> ${order.customerName}</p>
            <p><strong>Total Harga:</strong> ${formatRupiah(order.totalPrice)}</p>
            <p><strong>Nomor Meja:</strong> ${order.tableNumber}</p>
            <div>
                <h3>Menu Pesanan:</h3>
                ${itemsHTML}
            </div>
        `;

        document.querySelector('.modal-content').dataset.orderId = orderId;
        document.getElementById('orderDetailModal').style.display = 'block';
    }
}

// Cetak Bon Pesanan
function printReceipt() {
    const orderId = parseInt(document.querySelector('.modal-content').dataset.orderId);
    const order = orders.find(o => o.id === orderId);

    if (order) {
        // Hitung ulang totalPrice 
        order.totalPrice = calculateTotalPrice(order.menuItems);

        let receiptHTML = `
            <h2>Bon Pesanan</h2>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nomor Pesanan</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">#${order.id}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nama Pemesan</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${order.customerName}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Nomor Meja</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${order.tableNumber}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Total Harga</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${formatRupiah(order.totalPrice)}</td>
                </tr>
            </table>
            <h3>Menu Pesanan:</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 10px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">Nama Menu</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Harga</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.menuItems
                        .map(
                            item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${formatRupiah(item.price)}</td>
                            </tr>
                        `
                        )
                        .join('')}
                </tbody>
            </table>
        `;

        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Bon Pesanan</title></head><body>');
        printWindow.document.write(receiptHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}


// Mengubah Status Pesanan
function changeOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);

    if (order) {
        order.status = order.status === 'processing' ? 'completed' : 'processing';
        displayOrders(); // Update daftar pesanan setelah status diubah
    }
}

// Menutup Modal
function closeModal() {
    document.getElementById('orderDetailModal').style.display = 'none';
}

// Inisialisasi
displayOrders();
