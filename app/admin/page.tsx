"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Search, AlertCircle, CheckCircle2, DollarSign, Package, Puzzle, MapPin, Lock, Eye, EyeOff } from "lucide-react";

interface StatePrice {
  id: number;
  state_name: string;
  fee: number;
  updated_at: string;
}

interface PackagePrice {
  id: number;
  package_name: string;
  price: number;
  updated_at: string;
}

interface AddonPrice {
  id: number;
  addon_name: string;
  addon_key: string;
  price: number;
  updated_at: string;
}

type TabType = "states" | "packages" | "addons";

const ADMIN_PASSWORD = "Brendat@5432";

export default function AdminPricing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<TabType>("states");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State prices
  const [statePrices, setStatePrices] = useState<StatePrice[]>([]);
  const [stateLoading, setStateLoading] = useState(true);
  const [stateSearch, setStateSearch] = useState("");
  const [editedStatePrices, setEditedStatePrices] = useState<Record<string, number>>({});

  // Package prices
  const [packagePrices, setPackagePrices] = useState<PackagePrice[]>([]);
  const [packageLoading, setPackageLoading] = useState(true);
  const [editedPackagePrices, setEditedPackagePrices] = useState<Record<string, number>>({});

  // Addon prices
  const [addonPrices, setAddonPrices] = useState<AddonPrice[]>([]);
  const [addonLoading, setAddonLoading] = useState(true);
  const [editedAddonPrices, setEditedAddonPrices] = useState<Record<string, number>>({});

  const [saving, setSaving] = useState(false);

  // Check if already authenticated (session storage)
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch functions
  const fetchStatePrices = async () => {
    setStateLoading(true);
    try {
      const res = await fetch("/api/admin/state-prices");
      if (res.ok) {
        const data = await res.json();
        setStatePrices(data);
        setEditedStatePrices({});
      }
    } catch (error) {
      console.error("Failed to fetch state prices:", error);
    } finally {
      setStateLoading(false);
    }
  };

  const fetchPackagePrices = async () => {
    setPackageLoading(true);
    try {
      const res = await fetch("/api/admin/package-prices");
      if (res.ok) {
        const data = await res.json();
        setPackagePrices(data);
        setEditedPackagePrices({});
      }
    } catch (error) {
      console.error("Failed to fetch package prices:", error);
    } finally {
      setPackageLoading(false);
    }
  };

  const fetchAddonPrices = async () => {
    setAddonLoading(true);
    try {
      const res = await fetch("/api/admin/addon-prices");
      if (res.ok) {
        const data = await res.json();
        setAddonPrices(data);
        setEditedAddonPrices({});
      }
    } catch (error) {
      console.error("Failed to fetch addon prices:", error);
    } finally {
      setAddonLoading(false);
    }
  };

  // Fetch prices when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchStatePrices();
      fetchPackagePrices();
      fetchAddonPrices();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 text-center mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Enter the admin password to manage pricing</p>
          
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Save handlers
  const handleSaveStates = async () => {
    if (Object.keys(editedStatePrices).length === 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/state-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: editedStatePrices }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "State prices updated!" });
        await fetchStatePrices();
      } else {
        setMessage({ type: "error", text: "Failed to save state prices" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save state prices" });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePackages = async () => {
    if (Object.keys(editedPackagePrices).length === 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/package-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: editedPackagePrices }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Package prices updated!" });
        await fetchPackagePrices();
      } else {
        setMessage({ type: "error", text: "Failed to save package prices" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save package prices" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAddons = async () => {
    if (Object.keys(editedAddonPrices).length === 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/addon-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: editedAddonPrices }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Add-on prices updated!" });
        await fetchAddonPrices();
      } else {
        setMessage({ type: "error", text: "Failed to save add-on prices" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save add-on prices" });
    } finally {
      setSaving(false);
    }
  };

  const filteredStatePrices = statePrices.filter((p) =>
    p.state_name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const hasStateChanges = Object.keys(editedStatePrices).length > 0;
  const hasPackageChanges = Object.keys(editedPackagePrices).length > 0;
  const hasAddonChanges = Object.keys(editedAddonPrices).length > 0;

  const tabs = [
    { id: "states" as const, label: "State Fees", icon: MapPin, count: statePrices.length },
    { id: "packages" as const, label: "Packages", icon: Package, count: packagePrices.length },
    { id: "addons" as const, label: "Add-ons", icon: Puzzle, count: addonPrices.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 text-accent" />
              <h1 className="text-3xl font-black text-gray-900">Pricing Manager</h1>
            </div>
            <p className="text-gray-500">
              Manage all pricing from one place. Changes reflect immediately in the order flow.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Lock className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-auto text-sm underline">Dismiss</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* STATE FEES TAB */}
        {activeTab === "states" && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={fetchStatePrices} disabled={stateLoading} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${stateLoading ? "animate-spin" : ""}`} /> Refresh
                </button>
                <button onClick={handleSaveStates} disabled={saving || !hasStateChanges} className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {hasStateChanges && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                You have {Object.keys(editedStatePrices).length} unsaved change(s).
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {stateLoading ? (
                <div className="p-8 text-center text-gray-400">Loading...</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">State</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Fee ($)</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStatePrices.map((price) => {
                      const isEdited = editedStatePrices[price.state_name] !== undefined;
                      const currentValue = isEdited ? editedStatePrices[price.state_name] : price.fee;
                      return (
                        <tr key={price.id} className={isEdited ? "bg-amber-50" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{price.state_name}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">$</span>
                              <input
                                type="number"
                                min="0"
                                value={currentValue}
                                onChange={(e) => setEditedStatePrices((prev) => ({ ...prev, [price.state_name]: parseInt(e.target.value) || 0 }))}
                                className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                              />
                              {isEdited && <span className="text-xs text-amber-600 font-medium">(was ${price.fee})</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(price.updated_at).toLocaleDateString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* PACKAGE PRICES TAB */}
        {activeTab === "packages" && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">Edit the base price for each formation package.</p>
              <div className="flex gap-3">
                <button onClick={fetchPackagePrices} disabled={packageLoading} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${packageLoading ? "animate-spin" : ""}`} /> Refresh
                </button>
                <button onClick={handleSavePackages} disabled={saving || !hasPackageChanges} className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {hasPackageChanges && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                You have {Object.keys(editedPackagePrices).length} unsaved change(s).
              </div>
            )}

            <div className="grid gap-4">
              {packageLoading ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">Loading...</div>
              ) : (
                packagePrices.map((pkg) => {
                  const isEdited = editedPackagePrices[pkg.package_name] !== undefined;
                  const currentValue = isEdited ? editedPackagePrices[pkg.package_name] : pkg.price;
                  return (
                    <div key={pkg.id} className={`bg-white rounded-xl border p-6 flex items-center justify-between ${isEdited ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{pkg.package_name}</h3>
                        <p className="text-xs text-gray-400 mt-1">Last updated: {new Date(pkg.updated_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-lg">$</span>
                        <input
                          type="number"
                          min="0"
                          value={currentValue}
                          onChange={(e) => setEditedPackagePrices((prev) => ({ ...prev, [pkg.package_name]: parseInt(e.target.value) || 0 }))}
                          className="w-32 px-4 py-2 border border-gray-200 rounded-lg text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                        {isEdited && <span className="text-xs text-amber-600 font-medium">(was ${pkg.price})</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* ADDON PRICES TAB */}
        {activeTab === "addons" && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">Edit prices for add-on services shown in the comparison table.</p>
              <div className="flex gap-3">
                <button onClick={fetchAddonPrices} disabled={addonLoading} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${addonLoading ? "animate-spin" : ""}`} /> Refresh
                </button>
                <button onClick={handleSaveAddons} disabled={saving || !hasAddonChanges} className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {hasAddonChanges && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                You have {Object.keys(editedAddonPrices).length} unsaved change(s).
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {addonLoading ? (
                <div className="p-8 text-center text-gray-400">Loading...</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Add-on Service</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Price ($)</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {addonPrices.map((addon) => {
                      const isEdited = editedAddonPrices[addon.addon_key] !== undefined;
                      const currentValue = isEdited ? editedAddonPrices[addon.addon_key] : addon.price;
                      return (
                        <tr key={addon.id} className={isEdited ? "bg-amber-50" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{addon.addon_name}</div>
                            <div className="text-xs text-gray-400">{addon.addon_key}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">$</span>
                              <input
                                type="number"
                                min="0"
                                value={currentValue}
                                onChange={(e) => setEditedAddonPrices((prev) => ({ ...prev, [addon.addon_key]: parseInt(e.target.value) || 0 }))}
                                className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                              />
                              {isEdited && <span className="text-xs text-amber-600 font-medium">(was ${addon.price})</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(addon.updated_at).toLocaleDateString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
