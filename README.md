# 🛒 Smart Grocery & Budget Safety Tracker (Mobile PWA)

Aplikasi Web Mobile Progressive Web App (PWA) bergaya *native mobile app* yang dirancang khusus untuk anak rantau belanja bulanan di supermarket sambil mendorong troli. Membantu mengontrol anggaran belanja secara ketat, menghitung diskon bertingkat yang sering menjebak, dan membandingkan harga realtime dengan bulan lalu.

---

## ✨ Fitur Utama (Sesuai Checklist SRS)

1. **Pencatatan Item Belanja Lengkap & Ergonomis Mobile**:
   - Format tampilan smartphone (*max-width 430px*, centered di layar desktop).
   - Pengelompokan kategori: 🥬 Sayur & Buah, 🥩 Daging & Telur, 🧂 Bumbu & Pokok, 🥛 Susu & Olahan, 🍪 Snack & Minuman, 🧼 Rumah & Mandi, 📦 Lainnya.
   - Pilihan satuan ukur lengkap: `kg`, `g`, `liter`, `ml`, `pcs`, `pack`, `ikat`, `kaleng`, `botol`, `box`, `bks`.
   - Input harga satuan (Rp) & tombol cepat (*bump chips* +5rb, +10rb, +25rb, +50rb).
   - *Autocomplete suggestions* saat mengetik nama produk dari basis data harga bulan lalu.

2. **Perhitungan Kuantitas Otomatis (Realtime Subtotal)**:
   - Stepper kuantitas ramah jempol (`-` dan `+`) langsung mengalikan harga satuan bersih ke subtotal baris dan total belanjaan seketika tanpa jeda.

3. **Kalkulator Diskon Bertingkat (Tiered & Multi-step Discount)**:
   - Menghitung diskon tunggal (contoh: `25%`), potongan nominal tunai (contoh: `Rp 5.000`), maupun diskon bertumpuk (contoh: `50% + 20%`).
   - Menerapkan rumus matematis tepat:
     $$\text{Harga Setelah 1} = \text{Harga Awal} \times (1 - d_1)$$
     $$\text{Harga Bersih} = \text{Harga Setelah 1} \times (1 - d_2)$$
   - Edukasi transparan di UI (menghilangkan ilusi diskon: promo 50% + 20% adalah diskon riil 60%, bukan 70%).
   - Dilengkapi *Quick Calculator* independen di *header* untuk menguji harga barang di lorong supermarket.

4. **Komparator Harga Realtime vs Bulan Lalu**:
   - Indikator visual seketika saat nama & harga barang dimasukkan:
     - 🔴 **Panah Merah Naik (↑)**: Jika harga naik dibanding bulan lalu (+Rp X / +Y%).
     - 🟢 **Panah Hijau Turun (↓)**: Jika harga turun / promo dibanding bulan lalu (-Rp X / -Y%).
     - 🔵 **Tanda Setara (=)**: Jika harga stabil/tetap.
     - 🟣 **Tanda Baru (✨)**: Jika produk baru pertama kali dibeli.

5. **Pengendali Anggaran (Safety Cap Dompet)**:
   - Input batas maksimal belanja sebelum/saat berada di supermarket.
   - Indikator meteran warna dinamis (*Sticky Header*):
     - 🟢 **AMAN** (< 75%): Indikator hijau tenang.
     - 🟡 **WASPADA** (75% - 94%): Indikator oranye & peringatan.
     - 🔴 **KRITIS / OVER BUDGET** (≥ 95% atau > 100%): Banner merah menyala berdenyut (*pulse animation*) dan audio/haptic alert seketika.
   - Sisa dompet realtime terpampang jelas.

6. **Riwayat & Database Belanja Otomatis**:
   - Fitur **"Selesaikan Belanja" (Checkout)** menyimpan sesi belanja ke `localStorage`.
   - **Otomatis Memperbarui Patokan**: Harga barang yang baru dibeli otomatis menjadi basis data pembanding resmi untuk belanja bulan berikutnya!
   - Fitur melihat dan menyalin teks struk resmi (*thermal receipt design*).
   - Ekspor cadangan riwayat ke file JSON.

7. **Dukungan Progressive Web App (PWA & Offline Mode)**:
   - File `manifest.webmanifest` & `sw.js` (Service Worker Cache).
   - Dapat dipasang langsung ke layar utama HP (*Add to Home Screen* / *Standalone*).
   - Berfungsi 100% *offline* di lantai dasar (*basement*) supermarket yang tidak ada sinyal.

---

## 🚀 Cara Menjalankan & Menguji Aplikasi

Aplikasi telah berjalan pada server lokal:
```bash
# Server lokal aktif pada port 3000
http://127.0.0.1:3000/
```

Untuk menjalankan manual jika diperlukan:
```bash
node serve.js
```
Lalu buka browser Anda di `http://127.0.0.1:3000` atau buka langsung file `index.html`.

---

## 📱 Panduan Pemasangan di Layar Utama HP (Add to Home Screen)

- **Android (Chrome)**: Buka `http://<IP-Lokal>:3000` -> Tap Menu Tiga Titik -> Pilih **"Instal aplikasi"** atau **"Tambahkan ke Layar Utama"**.
- **iOS (Safari)**: Buka di Safari -> Tap Ikon Bagikan (*Share Sheet*) -> Pilih **"Add to Home Screen"** (*Tambahkan ke Layar Utama*).