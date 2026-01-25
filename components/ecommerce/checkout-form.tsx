/* 
  components/ecommerce/checkout-form.tsx
  Organized by: raiyayusuf
*/

"use client";

import { formatValidationError } from "@/lib/utils/formatters";
import { FormEvent, useState } from "react";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
export interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  shipping: string;
  payment: string;
  notes: string;
}

interface CheckoutFormProps {
  onSubmit: (formData: CheckoutFormData) => void;
  initialData?: Partial<CheckoutFormData>;
}

/* ============================================
   CHECKOUT FORM COMPONENT
   ============================================ */
export default function CheckoutForm({
  onSubmit,
  initialData,
}: CheckoutFormProps) {
  /* ============================================
     STATE MANAGEMENT
     ============================================ */
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    postal: initialData?.postal || "",
    shipping: initialData?.shipping || "regular",
    payment: initialData?.payment || "bank-transfer",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});

  /* ============================================
     EVENT HANDLERS
     ============================================ */

  /**
   * Handle input change for text fields
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle radio button change for shipping/payment
   */
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Validate form before submission
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    const requiredFields: (keyof CheckoutFormData)[] = [
      "name",
      "phone",
      "email",
      "address",
      "city",
      "postal",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = formatValidationError(
          field === "phone"
            ? "Nomor Telepon"
            : field === "email"
              ? "Email"
              : field === "address"
                ? "Alamat"
                : field === "city"
                  ? "Kota"
                  : field === "postal"
                    ? "Kode Pos"
                    : "Nama Lengkap",
        );
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Phone validation (min 10 digits)
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Nomor telepon minimal 10 digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ============================================
         SECTION 1: CUSTOMER INFORMATION
         ============================================ */}
      <div className="bg-white rounded-xl shadow-bunglon-light p-6 border border-primary-soft/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
            <i className="fas fa-user text-primary text-lg"></i>
          </div>
          <h3 className="text-xl font-bold text-primary-dark">
            Informasi Penerima
          </h3>
        </div>

        {/* Name & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
              placeholder="Masukkan nama lengkap"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
              placeholder="Contoh: 081234567890"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
            placeholder="email@contoh.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none`}
            placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
            required
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {/* City & Postal Code Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kota <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
              placeholder="Nama kota"
              required
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="postal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kode Pos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postal"
              name="postal"
              value={formData.postal}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.postal ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`}
              placeholder="5 digit kode pos"
              required
            />
            {errors.postal && (
              <p className="mt-1 text-sm text-red-600">{errors.postal}</p>
            )}
          </div>
        </div>
      </div>

      {/* ============================================
         SECTION 2: NOTES (OPTIONAL)
         ============================================ */}
      <div className="bg-white rounded-xl shadow-bunglon-light p-6 border border-primary-soft/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
            <i className="fas fa-sticky-note text-primary text-lg"></i>
          </div>
          <h3 className="text-xl font-bold text-primary-dark">
            Catatan (Opsional)
          </h3>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tambahkan catatan untuk pesanan Anda
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
            placeholder="Contoh: Kirim sebelum jam 3 sore, atau tambahkan kartu ucapan..."
          />
        </div>
      </div>

      {/* ============================================
         HIDDEN SUBMIT BUTTON (Will be in main page)
         ============================================ */}
      <button type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
}
