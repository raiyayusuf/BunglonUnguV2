/* 
  lib/utils/formatters.ts
  Organized by: raiyayusuf
*/

/* ============================================
   TYPE DEFINITIONS
   ============================================ */

/* ============================================
   PRICE FORMATTING
   ============================================ */

/**
 * Format price to Indonesian Rupiah
 * @param price - Price to format
 * @param options - Formatting options
 * @returns string - Formatted price string
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
): string {
  const {
    currency = "IDR",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(price);
  } catch (error) {
    console.error("❌ Error formatting price:", error);
    return `Rp ${price.toLocaleString("id-ID")}`;
  }
}

/**
 * Format price without currency symbol
 * @param price - Price to format
 * @returns string - Formatted number string
 */
export function formatNumber(price: number): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    console.error("❌ Error formatting number:", error);
    return price.toString();
  }
}

/* ============================================
   DATE & TIME FORMATTING
   ============================================ */

/**
 * Format date to Indonesian locale
 * @param date - Date string or Date object
 * @param options - Formatting options
 * @returns string - Formatted date string
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    };

    return dateObj.toLocaleDateString("id-ID", defaultOptions);
  } catch (error) {
    console.error("❌ Error formatting date:", error);
    return typeof date === "string" ? date : date.toString();
  }
}

/**
 * Format date and time to Indonesian locale
 * @param date - Date string or Date object
 * @returns string - Formatted date-time string
 */
export function formatDateTime(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("❌ Error formatting date-time:", error);
    return typeof date === "string" ? date : date.toString();
  }
}

/**
 * Format relative time (e.g., "2 jam yang lalu")
 * @param date - Date string or Date object
 * @returns string - Relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} hari yang lalu`;
    } else if (diffHours > 0) {
      return `${diffHours} jam yang lalu`;
    } else if (diffMins > 0) {
      return `${diffMins} menit yang lalu`;
    } else {
      return "Baru saja";
    }
  } catch (error) {
    console.error("❌ Error formatting relative time:", error);
    return "";
  }
}

/* ============================================
   STRING FORMATTING
   ============================================ */

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns string - Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns string - Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Format phone number to Indonesian format
 * @param phone - Phone number string
 * @returns string - Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 12) {
    return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (cleaned.length === 13) {
    return cleaned.replace(/(\d{4})(\d{4})(\d{5})/, "$1-$2-$3");
  }

  return phone;
}

/* ============================================
   VALIDATION FORMATTING
   ============================================ */

/**
 * Format validation error message
 * @param fieldName - Name of the field
 * @returns string - Formatted error message
 */
export function formatValidationError(fieldName: string): string {
  return `Harap lengkapi field: ${fieldName}`;
}

/**
 * Format cart item count message
 * @param count - Item count
 * @returns string - Formatted count message
 */
export function formatCartCount(count: number): string {
  if (count === 0) return "Keranjang kosong";
  if (count === 1) return "1 produk";
  return `${count} produk`;
}

/* ============================================
   EXPORT CONFIGURATION
   ============================================ */
export default {
  formatPrice,
  formatNumber,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  truncateText,
  capitalizeWords,
  formatPhoneNumber,
  formatValidationError,
  formatCartCount,
};
