/* 
  app/(shop)/layout.tsx
  Organized by: raiyayusuf
*/

"use client";

/* ============================================
   SHOP LAYOUT COMPONENT
   ============================================ */

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ============================================
          MAIN CONTENT AREA
          ============================================ */}
      <div className="container mx-auto px-4 py-8">{children}</div>

      {/* ============================================
          SHOP INFO BANNER (Optional)
          ============================================ */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Free Shipping Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-truck text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Gratis Ongkir</h3>
                <p className="text-sm text-gray-600">
                  Minimal pembelian Rp 200.000
                </p>
              </div>
            </div>

            {/* Freshness Guarantee */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Garansi Segar</h3>
                <p className="text-sm text-gray-600">100% bunga segar</p>
              </div>
            </div>

            {/* Customer Support */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-headset text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">CS 24 Jam</h3>
                <p className="text-sm text-gray-600">Siap membantu Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
