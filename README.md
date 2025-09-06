# AI Expense Tracker

Aplikasi web modern yang dibangun dengan Next.js untuk membantu pengguna melacak dan menganalisis pengeluaran pribadi dengan bantuan kecerdasan buatan (AI). Aplikasi ini menyediakan visualisasi data, riwayat transaksi, dan wawasan cerdas untuk manajemen keuangan yang lebih baik.

**Dikembangkan oleh:** Faried Iskandar
**Repositori:** [https://github.com/frdiskandr/ai-expanse-tracker-nextJs.git](https://github.com/frdiskandr/ai-expanse-tracker-nextJs.git)

## Fitur Utama

- **Autentikasi Pengguna:** Sistem sign-in dan sign-up yang aman menggunakan Clerk.
- **Pencatatan Pengeluaran:** Menambah, melihat, dan menghapus catatan pengeluaran dengan mudah.
- **Visualisasi Data:** Grafik dan bagan interaktif untuk memvisualisasikan distribusi pengeluaran.
- **Wawasan AI:** Mendapatkan analisis dan saran cerdas dari AI (didukung oleh Google Gemini) mengenai pola pengeluaran.
- **Riwayat Transaksi:** Melihat daftar lengkap semua pengeluaran yang telah dicatat.
- **Desain Responsif:** Tampilan yang optimal di berbagai perangkat, baik desktop maupun mobile.

## Teknologi yang Digunakan

- **Framework:** Next.js (App Router)
- **Bahasa:** TypeScript
- **Database:** Prisma ORM (terhubung ke database seperti PostgreSQL, MySQL, dll.)
- **Autentikasi:** Clerk
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Manajemen State:** React Context & Hooks
- **Linting & Formatting:** ESLint

## Struktur Folder

Berikut adalah penjelasan mengenai struktur direktori utama dalam proyek ini:

```
/
├── prisma/                 # Skema dan migrasi database Prisma
│   ├── schema.prisma
│   └── migrations/
├── public/                 # Aset statis (gambar, ikon)
├── src/
│   ├── app/                # Direktori utama Next.js App Router
│   │   ├── (auth)/         # Grup rute untuk halaman autentikasi
│   │   ├── _Action/        # Server Actions untuk logika backend (CRUD, AI)
│   │   ├── api/            # (Jika ada) Rute API
│   │   ├── layout.tsx      # Layout utama aplikasi
│   │   └── page.tsx        # Halaman utama (homepage)
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── AiInsights.tsx
│   │   ├── BarChart.tsx
│   │   └── recordHistory.tsx
│   ├── contexts/           # React Context untuk state global (misal: tema)
│   ├── lib/                # Fungsi utilitas dan inisialisasi library
│   │   ├── ai.ts           # Logika untuk berinteraksi dengan Gemini API
│   │   ├── db.ts           # Inisialisasi klien Prisma
│   │   └── checkUser.ts    # Fungsi bantuan terkait pengguna
│   └── types/              # Definisi tipe TypeScript
├── .env.example            # Contoh file variabel lingkungan
├── next.config.ts          # Konfigurasi Next.js
└── package.json            # Dependensi dan skrip proyek
```

## Instalasi dan Deployment Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di komputer Anda:

**1. Prasyarat**
- Node.js (v18 atau lebih baru)
- npm / yarn / pnpm
- Git
- Sebuah database (misalnya PostgreSQL) yang berjalan

**2. Clone Repositori**
```bash
git clone https://github.com/frdiskandr/ai-expanse-tracker-nextJs.git
cd ai-expanse-tracker-nextJs
```

**3. Instal Dependensi**
```bash
npm install
```

**4. Konfigurasi Variabel Lingkungan**
- Salin file `.env.example` menjadi `.env`.
- Isi semua variabel yang diperlukan di dalam file `.env`:
  - `DATABASE_URL`: Connection string untuk database Anda.
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Kunci publishable dari dashboard Clerk Anda.
  - `CLERK_SECRET_KEY`: Kunci rahasia dari dashboard Clerk Anda.
  - `GEMINI_API_KEY`: Kunci API dari Google AI Studio untuk menggunakan Gemini.

**5. Migrasi Database**
Jalankan perintah berikut untuk membuat tabel di database Anda sesuai dengan skema Prisma.
```bash
npx prisma migrate dev
```

**6. Jalankan Aplikasi**
Setelah semua langkah di atas selesai, jalankan server pengembangan.
```bash
npm run dev
```

**7. Akses Aplikasi**
Buka browser Anda dan kunjungi [http://localhost:3000](http://localhost:3000).