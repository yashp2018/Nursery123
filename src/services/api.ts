/**
 * API Service Layer — Placeholder functions for future PHP/PostgreSQL backend.
 * 
 * Replace BASE_URL with your actual PHP API endpoint when connecting backend.
 * All functions return typed data and handle errors gracefully.
 * 
 * Usage: import { fetchCategories, fetchVarieties } from "@/services/api";
 */

const BASE_URL = "/api"; // Change to your PHP backend URL, e.g. "https://yourdomain.com/api"

// ─── Catalog APIs ───────────────────────────────────────────

export async function fetchCategories() {
  // Replace with: fetch(`${BASE_URL}/get_categories.php`)
  const res = await fetch(`${BASE_URL}/get_categories.php`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCrops(categoryId: string) {
  // Replace with: fetch(`${BASE_URL}/get_crops.php?category_id=${categoryId}`)
  const res = await fetch(`${BASE_URL}/get_crops.php?category_id=${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch crops");
  return res.json();
}

export async function fetchVarieties(cropId: string) {
  // Replace with: fetch(`${BASE_URL}/get_varieties.php?crop_id=${cropId}`)
  const res = await fetch(`${BASE_URL}/get_varieties.php?crop_id=${cropId}`);
  if (!res.ok) throw new Error("Failed to fetch varieties");
  return res.json();
}

export async function fetchVarietyDetails(id: string) {
  // Replace with: fetch(`${BASE_URL}/get_variety_details.php?id=${id}`)
  const res = await fetch(`${BASE_URL}/get_variety_details.php?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch variety details");
  return res.json();
}

// ─── Cart APIs ──────────────────────────────────────────────

export async function addToCart(varietyId: string, quantity: number, deliveryType: string) {
  const res = await fetch(`${BASE_URL}/cart_add.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variety_id: varietyId, quantity, delivery_type: deliveryType }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function removeFromCart(varietyId: string) {
  const res = await fetch(`${BASE_URL}/cart_remove.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variety_id: varietyId }),
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
}

export async function updateCart(varietyId: string, quantity: number) {
  const res = await fetch(`${BASE_URL}/cart_update.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variety_id: varietyId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart_get.php`);
  if (!res.ok) throw new Error("Failed to get cart");
  return res.json();
}

// ─── Auth APIs ──────────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(data: {
  name: string;
  phone: string;
  email: string;
  password: string;
  address?: string;
}) {
  const res = await fetch(`${BASE_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// ─── Order APIs ─────────────────────────────────────────────

export async function placeOrder(data: {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_pincode: string;
  payment_method: string;
}) {
  const res = await fetch(`${BASE_URL}/place_order.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to place order");
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/get_orders.php`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

// ─── Admin APIs ─────────────────────────────────────────────

export async function adminGetDashboard() {
  const res = await fetch(`${BASE_URL}/admin/dashboard.php`);
  if (!res.ok) throw new Error("Failed to fetch admin dashboard");
  return res.json();
}

export async function adminGetOrders() {
  const res = await fetch(`${BASE_URL}/admin/orders.php`);
  if (!res.ok) throw new Error("Failed to fetch admin orders");
  return res.json();
}

export async function adminUpdateOrderStatus(orderId: string, status: string) {
  const res = await fetch(`${BASE_URL}/admin/update_order.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId, status }),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function adminGetVarieties() {
  const res = await fetch(`${BASE_URL}/admin/varieties.php`);
  if (!res.ok) throw new Error("Failed to fetch varieties");
  return res.json();
}

export async function adminGetCategories() {
  const res = await fetch(`${BASE_URL}/admin/categories.php`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function adminGetCustomers() {
  const res = await fetch(`${BASE_URL}/admin/customers.php`);
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

// ─── Price Calculator (Frontend-only, mirrors backend logic) ─

export function calculatePriceLocal(
  priceExFactory: number,
  price15k: number,
  price30k: number,
  quantity: number
): number {
  if (quantity >= 30000) return price30k;
  if (quantity >= 15000) return price15k;
  return priceExFactory;
}

export function calculateDeliveryLocal(
  chargePerPlant: number,
  quantity: number
): number {
  return chargePerPlant * quantity;
}
