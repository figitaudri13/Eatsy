// Mendapatkan ID Meja dari URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableID = urlParams.get('table_id') || 'Unknown';
  
    // Tampilkan ID Meja di halaman
    const tableInfoElement = document.getElementById('table-info');
    if (tableInfoElement) {
      tableInfoElement.innerText = `Meja: ${tableID}`;
    }
  
    // Menambahkan table_id ke data pemesanan saat pelanggan memesan
    document.getElementById("order-button").addEventListener("click", function() {
      const orderData = {
        items: getSelectedItems(),  // Fungsi untuk mendapatkan item yang dipesan
        total: calculateTotal(),    // Fungsi untuk menghitung total harga
        table_id: tableID          
      };
  
      // Simpan pesanan di localStorage
      localStorage.setItem('order', JSON.stringify(orderData));
      console.log('Pesanan disimpan:', orderData);
    });
  });
  
  // Contoh fungsi dummy (sesuaikan dengan kebutuhan)
  function getSelectedItems() {
    // Mendapatkan item pesanan (sesuaikan)
    return ["Item 1", "Item 2"];
  }
  
  function calculateTotal() {
    // Menghitung total pesanan
    return 50000;
  }
  
