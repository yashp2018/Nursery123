import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Leaf, BarChart3, Settings, LogOut,
  TrendingUp, TrendingDown, AlertTriangle, Eye, Edit, Trash2, Plus, Search, ChevronDown,
  DollarSign, ShoppingBag, UserCheck, Box
} from "lucide-react";

const sidebarLinks = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "varieties", label: "Varieties", icon: Leaf },
  { id: "categories", label: "Categories", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const dashboardStats = [
  { label: "Total Revenue", value: "₹18.5L", change: "+12%", up: true, icon: DollarSign },
  { label: "Total Orders", value: "156", change: "+8%", up: true, icon: ShoppingBag },
  { label: "Active Customers", value: "89", change: "+5%", up: true, icon: UserCheck },
  { label: "Low Stock Items", value: "3", change: "", up: false, icon: AlertTriangle },
];

const recentOrders = [
  { id: "SNH-4521", customer: "Rajesh Patil", date: "2025-01-15", total: "₹48,000", status: "delivered", plants: "15,000" },
  { id: "SNH-4520", customer: "Suresh Kumar", date: "2025-01-15", total: "₹72,000", status: "shipped", plants: "30,000" },
  { id: "SNH-4519", customer: "Vinod Sharma", date: "2025-01-14", total: "₹31,500", status: "confirmed", plants: "10,000" },
  { id: "SNH-4518", customer: "Anand Jadhav", date: "2025-01-14", total: "₹90,000", status: "pending", plants: "45,000" },
  { id: "SNH-4517", customer: "Manoj Deshmukh", date: "2025-01-13", total: "₹27,000", status: "delivered", plants: "15,000" },
];

const varietiesData = [
  { id: 1, name: "Arka Rakshak", crop: "Tomato", company: "IIHR", stock: 50000, price15k: "₹3.0", price30k: "₹2.5", status: "active" },
  { id: 2, name: "Namdhari 600", crop: "Tomato", company: "Namdhari", stock: 35000, price15k: "₹3.5", price30k: "₹3.0", status: "active" },
  { id: 3, name: "VNR 312", crop: "Chili", company: "VNR Seeds", stock: 2500, price15k: "₹2.5", price30k: "₹2.0", status: "low-stock" },
  { id: 4, name: "Mahyco Super", crop: "Brinjal", company: "Mahyco", stock: 0, price15k: "₹2.3", price30k: "₹1.8", status: "out" },
  { id: 5, name: "Indra Grafted", crop: "Capsicum", company: "Syngenta", stock: 20000, price15k: "₹4.5", price30k: "₹4.0", status: "active" },
];

const categoriesData = [
  { id: 1, name: "Vegetable Plants", crops: 5, varieties: 26, status: "active" },
  { id: 2, name: "Fruit Plants", crops: 3, varieties: 8, status: "active" },
  { id: 3, name: "Flower Plants", crops: 2, varieties: 4, status: "inactive" },
];

const statusMap: Record<string, string> = {
  pending: "badge-pending",
  confirmed: "badge-confirmed",
  shipped: "badge-shipped",
  delivered: "badge-delivered",
  cancelled: "badge-cancelled",
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30" id="admin-dashboard">
      {/* ===== SIDEBAR ===== */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? "w-20" : "w-64"} transition-all duration-300 fixed left-0 top-0 h-full z-50`} id="admin-sidebar">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-display font-bold text-primary-foreground text-lg leading-tight">Admin Panel</h2>
                <p className="text-[10px] text-primary-foreground/50 uppercase tracking-widest">Sanap Nursery</p>
              </div>
            )}
          </Link>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`admin-sidebar-link w-full ${activeSection === link.id ? "active" : ""} ${sidebarCollapsed ? "justify-center px-2" : ""}`}
                id={`admin-nav-${link.id}`}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span>{link.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Link
            to="/"
            className={`admin-sidebar-link w-full ${sidebarCollapsed ? "justify-center px-2" : ""}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-64"} transition-all duration-300 p-6 md:p-8`}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="mr-4 text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground inline">
              {sidebarLinks.find(l => l.id === activeSection)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-60" />
            </div>
            <div className="w-9 h-9 rounded-full gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">A</div>
          </div>
        </div>

        {/* ===== DASHBOARD VIEW ===== */}
        {activeSection === "dashboard" && (
          <div className="space-y-6" id="admin-stats">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border/50 p-6 shadow-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    {stat.change && (
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                        {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="admin-charts">
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
                <h3 className="font-display font-bold text-foreground mb-4">Monthly Revenue</h3>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 50, 80, 72, 90, 85, 95, 70, 88, 92, 78].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 gradient-cta rounded-t-lg min-w-0 relative group"
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{(h * 2000).toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
                <h3 className="font-display font-bold text-foreground mb-4">Crop-wise Sales</h3>
                <div className="space-y-4">
                  {[
                    { name: "Tomato", percent: 45, color: "bg-red-400" },
                    { name: "Chili", percent: 25, color: "bg-green-500" },
                    { name: "Brinjal", percent: 15, color: "bg-purple-400" },
                    { name: "Capsicum", percent: 10, color: "bg-yellow-500" },
                    { name: "Watermelon", percent: 5, color: "bg-pink-400" },
                  ].map((crop) => (
                    <div key={crop.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{crop.name}</span>
                        <span className="text-muted-foreground">{crop.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${crop.percent}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full ${crop.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden" id="admin-recent-orders">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="font-display font-bold text-foreground text-lg">Recent Orders</h3>
                <button onClick={() => setActiveSection("orders")} className="text-sm text-primary font-semibold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Order</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Plants</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-3 text-sm font-semibold text-primary">{order.id}</td>
                        <td className="px-6 py-3 text-sm text-foreground">{order.customer}</td>
                        <td className="px-6 py-3 text-sm text-muted-foreground">{order.plants}</td>
                        <td className="px-6 py-3 text-sm font-semibold text-foreground">{order.total}</td>
                        <td className="px-6 py-3"><span className={statusMap[order.status]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6" id="low-stock-alerts">
              <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" /> Low Stock Alerts
              </h3>
              <div className="space-y-3">
                {varietiesData.filter(v => v.status !== "active").map((v) => (
                  <div key={v.id} className="flex items-center justify-between bg-card rounded-xl p-4 border border-border/50">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{v.name} ({v.crop})</p>
                      <p className="text-xs text-muted-foreground">{v.company} · Stock: {v.stock.toLocaleString()}</p>
                    </div>
                    <span className={v.stock === 0 ? "badge-cancelled" : "badge-pending"}>
                      {v.stock === 0 ? "Out of Stock" : "Low Stock"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ORDERS VIEW ===== */}
        {activeSection === "orders" && (
          <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden" id="admin-orders">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-display font-bold text-foreground text-lg">All Orders</h3>
              <div className="flex gap-2">
                <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" id="ordersTable">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Order</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Plants</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-primary">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.plants}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.total}</td>
                      <td className="px-6 py-4"><span className={statusMap[order.status]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="View"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== VARIETIES VIEW ===== */}
        {activeSection === "varieties" && (
          <div id="admin-varieties">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search varieties..." className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button className="gradient-cta text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-elevated transition-all btn-ripple">
                <Plus className="w-4 h-4" /> Add Variety
              </button>
            </div>
            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" id="varietiesTable">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Variety</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Crop</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Company</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Stock</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">15K Rate</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">30K Rate</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {varietiesData.map((v) => (
                      <tr key={v.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{v.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{v.crop}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{v.company}</td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{v.stock.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{v.price15k}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{v.price30k}</td>
                        <td className="px-6 py-4">
                          <span className={v.status === "active" ? "badge-delivered" : v.status === "low-stock" ? "badge-pending" : "badge-cancelled"}>
                            {v.status === "active" ? "Active" : v.status === "low-stock" ? "Low Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== CATEGORIES VIEW ===== */}
        {activeSection === "categories" && (
          <div id="categoriesTable">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">Manage product categories and crops</p>
              <button className="gradient-cta text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-elevated transition-all btn-ripple">
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoriesData.map((cat) => (
                <div key={cat.id} className="bg-card rounded-2xl border border-border/50 shadow-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display font-bold text-foreground text-lg">{cat.name}</h3>
                    <span className={cat.status === "active" ? "badge-delivered" : "badge-cancelled"}>
                      {cat.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center mb-4">
                    <div className="bg-muted rounded-xl p-3">
                      <p className="text-xl font-bold text-foreground">{cat.crops}</p>
                      <p className="text-xs text-muted-foreground">Crops</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3">
                      <p className="text-xl font-bold text-foreground">{cat.varieties}</p>
                      <p className="text-xs text-muted-foreground">Varieties</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1">
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors flex items-center justify-center gap-1">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CUSTOMERS VIEW ===== */}
        {activeSection === "customers" && (
          <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden" id="admin-customers">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-display font-bold text-foreground text-lg">All Customers</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search customers..." className="pl-10 pr-4 py-2 rounded-lg border border-border text-sm w-60 focus:outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" id="customersTable">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Orders</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Total Spent</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {["Rajesh Patil", "Suresh Kumar", "Vinod Sharma", "Anand Jadhav", "Manoj Deshmukh"].map((name, i) => (
                    <tr key={name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">+91 98765 {43210 + i}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{12 - i * 2}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{((12 - i * 2) * 45000).toLocaleString()}</td>
                      <td className="px-6 py-4"><span className="badge-delivered">Active</span></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== REPORTS VIEW ===== */}
        {activeSection === "reports" && (
          <div className="space-y-6" id="admin-reports">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Revenue Report", "Crop-wise Sales", "Bulk Order Statistics"].map((title) => (
                <div key={title} className="bg-card rounded-2xl border border-border/50 shadow-card p-6">
                  <h3 className="font-display font-bold text-foreground mb-3">{title}</h3>
                  <div className="h-40 flex items-center justify-center bg-muted/50 rounded-xl">
                    <BarChart3 className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <button className="mt-4 text-sm text-primary font-semibold hover:underline">Download Report →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SETTINGS VIEW ===== */}
        {activeSection === "settings" && (
          <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6 md:p-8 max-w-2xl" id="admin-settings">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Admin Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Business Name</label>
                <input type="text" defaultValue="Sanap Hi-Tech Nursery" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Contact Phone</label>
                <input type="tel" defaultValue="+91 98230 44556" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">WhatsApp Number</label>
                <input type="tel" defaultValue="+91 98230 44556" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button className="gradient-cta text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:shadow-elevated transition-all btn-ripple">Save Settings</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
