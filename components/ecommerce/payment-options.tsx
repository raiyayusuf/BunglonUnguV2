/* 
  components/ecommerce/payment-options.tsx
  Organized by: raiyayusuf
*/

"use client";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface PaymentOptionsProps {
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

/* ============================================
   PAYMENT OPTIONS DATA
   ============================================ */
const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "bank-transfer",
    name: "Transfer Bank",
    description: "Transfer ke rekening BCA, BRI, Mandiri, atau BNI",
    icon: "fa-university",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "credit-card",
    name: "Kartu Kredit",
    description: "Visa, MasterCard, atau JCB",
    icon: "fa-credit-card",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "e-wallet",
    name: "E-Wallet",
    description: "OVO, Gopay, Dana, atau ShopeePay",
    icon: "fa-mobile-alt",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "cod",
    name: "Bayar di Tempat",
    description: "Cash on Delivery (COD)",
    icon: "fa-money-bill-wave",
    color: "bg-orange-100 text-orange-600",
  },
];

/* ============================================
   PAYMENT OPTIONS COMPONENT
   ============================================ */
export default function PaymentOptions({
  selectedOption,
  onSelect,
}: PaymentOptionsProps) {
  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="bg-white rounded-xl shadow-bunglon-light p-6 border border-primary-soft/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
          <i className="fas fa-wallet text-primary text-lg"></i>
        </div>
        <h3 className="text-xl font-bold text-primary-dark">
          Metode Pembayaran
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`block cursor-pointer transition-all duration-300 ${
              selectedOption === option.id
                ? "border-2 border-primary bg-primary-soft/30"
                : "border border-gray-300 hover:border-primary-light hover:bg-primary-soft/10"
            } rounded-xl p-4`}
          >
            <div className="flex items-center gap-4">
              {/* Radio Button */}
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => onSelect(e.target.value)}
                className="w-5 h-5 text-primary focus:ring-primary/30 focus:ring-2"
              />

              {/* Payment Icon */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.color}`}
              >
                <i className={`fas ${option.icon} text-lg`}></i>
              </div>

              {/* Payment Details */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{option.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Payment Security Note */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3">
          <i className="fas fa-shield-alt text-green-500 text-xl"></i>
          <div>
            <p className="text-sm text-green-800 font-medium">
              🔒 Pembayaran Aman & Terenkripsi
            </p>
            <p className="text-xs text-green-600 mt-1">
              Transaksi Anda dilindungi dengan enkripsi SSL 256-bit. Data
              pembayaran tidak disimpan di server kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
