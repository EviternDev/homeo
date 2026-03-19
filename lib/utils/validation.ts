type CheckoutField =
  | "fullName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "notes";

type ValidationResult = string | null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PIN_REGEX = /^\d{6}$/;

const MIN_MAX_RULES: Record<Exclude<CheckoutField, "email" | "phone" | "postalCode">, { min?: number; max?: number; message: string }> = {
  fullName: {
    min: 3,
    max: 100,
    message: "Please enter your full name (at least 3 characters)",
  },
  address: {
    min: 10,
    max: 500,
    message: "Please enter your complete address",
  },
  city: {
    min: 2,
    max: 100,
    message: "Please enter your city (at least 2 characters)",
  },
  state: {
    min: 2,
    max: 100,
    message: "Please enter your state (at least 2 characters)",
  },
  notes: {
    max: 500,
    message: "Notes cannot exceed 500 characters",
  },
};

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone.trim());
}

export function isValidPinCode(pinCode: string): boolean {
  return PIN_REGEX.test(pinCode.trim());
}

export function validateField(field: CheckoutField, rawValue: string): ValidationResult {
  const value = rawValue?.trim() ?? "";

  switch (field) {
    case "email":
      if (!value || !isValidEmail(value)) {
        return "Please enter a valid email address";
      }
      return null;
    case "phone":
      if (!value || !isValidPhone(value)) {
        return "Please enter a valid 10-digit mobile number";
      }
      return null;
    case "postalCode":
      if (!value || !isValidPinCode(value)) {
        return "Please enter a valid 6-digit PIN code";
      }
      return null;
    case "notes":
      if (!value) {
        return null;
      }
      return validateLength(field, value);
    default:
      if (!value) {
        return MIN_MAX_RULES[field].message;
      }
      return validateLength(field, value);
  }
}

function validateLength(field: Exclude<CheckoutField, "email" | "phone" | "postalCode">, value: string): ValidationResult {
  const rule = MIN_MAX_RULES[field];

  if (rule.min !== undefined && value.length < rule.min) {
    return rule.message;
  }

  if (rule.max !== undefined && value.length > rule.max) {
    return rule.message;
  }

  return null;
}

export function validateForm(values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  const fields: CheckoutField[] = [
    "fullName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "postalCode",
    "notes",
  ];

  for (const field of fields) {
    const message = validateField(field, values[field] ?? "");
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}
