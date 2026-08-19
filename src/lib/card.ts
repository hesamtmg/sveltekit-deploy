export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export function detectBrand(digits: string): CardBrand {
	if (/^4/.test(digits)) return 'visa';
	if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
	if (/^3[47]/.test(digits)) return 'amex';
	if (/^6(011|5)/.test(digits)) return 'discover';
	return 'unknown';
}

export function groupSize(brand: CardBrand): number[] {
	return brand === 'amex' ? [4, 6, 5] : [4, 4, 4, 4];
}

export function formatCardNumber(raw: string): string {
	const digits = raw.replace(/\D/g, '').slice(0, 16);
	const brand = detectBrand(digits);
	const groups = groupSize(brand);
	const parts: string[] = [];
	let i = 0;
	for (const size of groups) {
		if (i >= digits.length) break;
		parts.push(digits.slice(i, i + size));
		i += size;
	}
	return parts.join(' ');
}

export function maskCardNumber(raw: string): string {
	const digits = raw.replace(/\D/g, '');
	const last4 = digits.slice(-4);
	return `•••• •••• •••• ${last4.padStart(4, '•')}`;
}

export function formatExpiry(raw: string): string {
	const digits = raw.replace(/\D/g, '').slice(0, 4);
	if (digits.length <= 2) return digits;
	return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvv(raw: string, brand: CardBrand): string {
	const max = brand === 'amex' ? 4 : 3;
	return raw.replace(/\D/g, '').slice(0, max);
}

export function luhnValid(raw: string): boolean {
	const digits = raw.replace(/\D/g, '');
	if (digits.length < 12) return false;
	let sum = 0;
	let shouldDouble = false;
	for (let i = digits.length - 1; i >= 0; i--) {
		let d = Number(digits[i]);
		if (shouldDouble) {
			d *= 2;
			if (d > 9) d -= 9;
		}
		sum += d;
		shouldDouble = !shouldDouble;
	}
	return sum % 10 === 0;
}

export function expiryValid(raw: string): boolean {
	const digits = raw.replace(/\D/g, '');
	if (digits.length !== 4) return false;
	const month = Number(digits.slice(0, 2));
	const year = 2000 + Number(digits.slice(2));
	if (month < 1 || month > 12) return false;
	const now = new Date();
	const endOfMonth = new Date(year, month, 0, 23, 59, 59);
	return endOfMonth >= now;
}
