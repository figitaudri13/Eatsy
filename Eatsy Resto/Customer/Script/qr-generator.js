// Script untuk menghasilkan QR Code
function generateQRCode(tableID) {
    const url = `http://localhost:5500/index.html?table_id=${tableID}`;
  
    new QRCode(document.getElementById("qrcode"), {
      text: url,
      width: 200,
      height: 200
    });
  }
  
  // Contoh penggunaan: panggil fungsi ini dengan ID Meja
  document.addEventListener('DOMContentLoaded', function() {
    const tableID = "Table_01"; // Ganti sesuai ID Meja
    generateQRCode(tableID);
  });
  