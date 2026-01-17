export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft to-white">
      {/* Hero Section */}
      <section className="py-28 md:py-32">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gradient-primary">
                Keindahan dalam setiap kelopak
              </h1>
              <p className="text-lg text-primary mb-8 max-w-2xl">
                Toko Bunga modern dengan sentuhan tradisional untuk semua
                kebutuhan spesial Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/products" className="btn-primary">
                  <i className="fas fa-store"></i>
                  Lihat Koleksi
                </a>
                <a href="/categories" className="btn-outline">
                  <i className="fas fa-list"></i>
                  Jelajahi Kategori
                </a>
              </div>
            </div>

            {/* Image/Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-light to-primary rounded-bunglon-xl h-64 md:h-80 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <i className="fas fa-flower text-5xl mb-4"></i>
                  <p className="text-lg">Bunga Segar Setiap Hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">
            Mengapa Memilih Kami?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card-product p-6 text-center">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold mb-2">Bunga Segar</h3>
              <p className="text-gray-600">
                Bunga pilihan dengan kualitas terbaik langsung dari petani
                handal
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-product p-6 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Gratis Pengiriman</h3>
              <p className="text-gray-600">
                Gratis ongkir untuk area Yogyakarta dengan pembelian minimal Rp
                250.000
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-product p-6 text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Kustomisasi</h3>
              <p className="text-gray-600">
                Buat buket sesuai keinginan Anda dengan bantuan florist
                profesional
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-product p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terbaik</h3>
              <p className="text-gray-600">
                Garansi 100% kepuasan pelanggan dengan kualitas terbaik atau
                uang kembali
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Product Card */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">
            Contoh Product Card V2
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Product Card sesuai V1 style */}
            <div className="card-product group">
              <div className="h-48 bg-gradient-to-br from-primary-soft to-primary-light rounded-t-bunglon-xl"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Romantic Roses</h3>
                  <span className="badge-featured">⭐ Unggulan</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  24 Mawar merah dengan packaging eksklusif
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-category">💐 Buket</span>
                  <div className="flex gap-1">
                    <span className="color-chip bg-red-500"></span>
                    <span className="color-chip bg-pink-300"></span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    Rp 299.000
                  </span>
                  <button className="btn-primary py-2 px-4 text-sm">
                    <i className="fas fa-cart-plus"></i>+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
