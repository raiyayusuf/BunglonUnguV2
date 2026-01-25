/* 
  components/ecommerce/shipping-options.tsx
  Organized by: raiyayusuf
*/

"use client";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  icon: string;
}

interface ShippingOptionsProps {
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

/* ============================================
   SHIPPING OPTIONS DATA
   ============================================ */
const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "regular",
    name: "Reguler",
    description: "Pengiriman standar",
    price: 0,
    deliveryTime: "3-5 hari kerja",
    icon: "fa-truck",
  },
  {
    id: "express",
    name: "Express",
    description: "Prioritas tinggi",
    price: 25000,
    deliveryTime: "1-2 hari kerja",
    icon: "fa-shipping-fast",
  },
  {
    id: "same-day",
    name: "Same Day",
    description: "Kirim hari ini",
    price: 50000,
    deliveryTime: "Hari ini (sebelum jam 14:00)",
    icon: "fa-bolt",
  },
];

/* ============================================
   SHIPPING OPTIONS COMPONENT
   ============================================ */
export default function ShippingOptions({
  selectedOption,
  onSelect,
}: ShippingOptionsProps) {
  /* ============================================
     FORMATTING HELPER
     ============================================ */
  const formatPrice = (price: number): string => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="bg-white rounded-xl shadow-bunglon-light p-6 border border-primary-soft/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
          <i className="fas fa-shipping-fast text-primary text-lg"></i>
        </div>
        <h3 className="text-xl font-bold text-primary-dark">
          Metode Pengiriman
        </h3>
      </div>

      <div className="space-y-4">
        {SHIPPING_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`block cursor-pointer transition-all duration-300 ${
              selectedOption === option.id
                ? "border-2 border-primary bg-primary-soft/30"
                : "border border-gray-300 hover:border-primary-light hover:bg-primary-soft/10"
            } rounded-xl p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => onSelect(e.target.value)}
                  className="w-5 h-5 text-primary focus:ring-primary/30 focus:ring-2"
                />

                {/* Option Icon */}
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <i className={`fas ${option.icon} text-primary text-xl`}></i>
                </div>

                {/* Option Details */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-800">{option.name}</h4>
                    <span className="text-xs font-medium px-2 py-1 bg-primary-soft text-primary-dark rounded-full">
                      {option.deliveryTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {formatPrice(option.price)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {option.price === 0 ? "Tidak ada biaya" : "Biaya tambahan"}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Shipping Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
          <div>
            <p className="text-sm text-blue-800 font-medium">
              📦 Pengiriman aman dengan pelindung khusus
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Bunga dikemas dengan bahan pelindung untuk menjaga kesegaran
              selama perjalanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
