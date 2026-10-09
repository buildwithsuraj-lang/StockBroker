"use client";

import { useEffect, useState } from "react";

const Calculator = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || null;
  const [tradeType, setTradeType] = useState("equity");
  const [exchange, setExchange] = useState("NSE");
  const [broker, setBroker] = useState("zerodha");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [store, setStore] = useState(null);
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get brokers
  useEffect(() => {
    async function getBrokers() {
      try {
        const response = await fetch(`${API_URL}/data`);

        if (!response.ok) {
          throw new Error("Failed to fetch brokers");
        }

        const data = await response.json();

        const brokerList = Array.isArray(data.message)
          ? data.message
          : [];

        setBrokers(brokerList);

        // Select first broker by default
        if (brokerList.length > 0) {
          setBroker(brokerList[0].name);
        }
      } catch (error) {
        console.error("Broker fetch error:", error);
        setError("Unable to load brokers.");
      }
    }

    getBrokers();
  }, []);

  // Calculate brokerage
  async function calculate() {
    if (!broker || !buyPrice || !sellPrice || !quantity) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCalculated(false);

      const response = await fetch(
       `${API_URL}/calculate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tradeType,
            exchange,
            broker,
            buyPrice: Number(buyPrice),
            sellPrice: Number(sellPrice),
            quantity: Number(quantity),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Calculation failed");
      }

      const result = await response.json();

      console.log("Calculation result:", result);

      setStore(result);
      setCalculated(true);
    } catch (error) {
      console.error("Calculate error:", error);
      setError("Unable to calculate brokerage.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {broker
              ? `${broker.charAt(0).toUpperCase()}${broker.slice(
                  1
                )} Brokerage Calculator`
              : "Brokerage Calculator"}
          </h1>

          <p className="mt-2 text-slate-500">
            Calculate brokerage, taxes and net profit
          </p>
        </div>

        {/* Calculator */}
        <div className="rounded-2xl border bg-white p-6">

          <div className="grid gap-5 md:grid-cols-2">

            {/* Broker */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select Broker
              </label>

              <select
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                {brokers.map((item) => (
                  <option
                    key={item._id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trade Type */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Trade Type
              </label>

              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="equity">Equity</option>
                <option value="intraday">Intraday</option>
                <option value="futures">Futures</option>
                <option value="options">Options</option>
              </select>
            </div>

            {/* Exchange */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Exchange
              </label>

              <select
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
              </select>
            </div>

            {/* Buy Price */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Buy Price
              </label>

              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="₹ 100"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sell Price */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sell Price
              </label>

              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="₹ 110"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Quantity
              </label>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="10"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={calculate}
            type="button"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>

          {/* Result */}
          {calculated && store && (
            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {broker}
                </h2>

                <div className="flex gap-2">
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold">
                    {store.tradeType}
                  </span>

                  <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold">
                    {store.exchange}
                  </span>
                </div>
              </div>

              {/* Net P&L */}
              <div className="mb-6">
                <p className="text-sm text-slate-400">
                  Net P&L
                </p>

                <p className="mt-1 text-4xl font-bold text-emerald-400">
                  ₹{Number(store.netprofit || 0).toFixed(2)}
                </p>
              </div>

              {/* Charges */}
              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Brokerage</span>
                  <strong>
                    ₹{Number(store.brok || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>STT / CTT</span>
                  <strong>
                    ₹{Number(store.stt || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Exchange Charges</span>
                  <strong>
                    ₹{Number(store.ExchangeCharges || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>SEBI Charges</span>
                  <strong>
                    ₹{Number(store.sebicharges || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Stamp Duty</span>
                  <strong>
                    ₹{Number(store.stampduty || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <strong>
                    ₹{Number(store.gst || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>DP Charges</span>
                  <strong>
                    ₹{Number(store.dpcharge || 0).toFixed(2)}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>IPFT Charges</span>
                  <strong>
                    ₹{Number(store.ipft || 0).toFixed(2)}
                  </strong>
                </div>

                {/* Total */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">
                      Total Charges
                    </span>

                    <strong>
                      ₹{Number(store.totalCharges || 0).toFixed(2)}
                    </strong>
                  </div>
                </div>

              </div>

              {/* Bottom Values */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Turnover
                  </p>

                  <p className="mt-1 font-bold">
                    ₹{Number(store.turnover || 0).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Gross P&L
                  </p>

                  <p className="mt-1 font-bold">
                    ₹{Number(store.grossprofit || 0).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Total Charges
                  </p>

                  <p className="mt-1 font-bold">
                    ₹{Number(store.totalCharges || 0).toFixed(2)}
                  </p>
                </div>

              </div>

              {/* Open Account */}
              <button
                onClick={() => {
                  if (store.link) {
                    window.open(
                      store.link,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
                className="group relative mt-5 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Open Account in {broker}

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Calculator;