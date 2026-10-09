"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Compare =  () => {
  const [brok, setBrok] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [data, setData] = useState(""); 
  const [datas, setDatas] = useState("");
  const [showPopup, setShowPopup] = useState(null);

  const tradingFeatures = [
    ["tradingPlatform", "Trading Platform"],
    ["mobileApp", "Mobile App"],
    ["webPlatform", "Web Platform"],
    ["ipo", "IPO"],
    ["mutualFunds", "Mutual Funds"],
    ["etfs", "ETFs"],
    ["commodities", "Commodities"],
    ["currency", "Currency"],
    ["api", "API"],
    ["research", "Research"],
    ["customerSupport", "Customer Support"],
  ];

  // Set default brokers after broker data loads
  useEffect(() => {
    if (brok.length >= 2) {
      setData(brok[0].name);
      setDatas(brok[1].name);
    }
  }, [brok]);

  // Compare brokers



    useEffect(() => {
     
    const fetchBrokers = async () => {
      try {
        console.log("hello")
        const response = await fetch(`${API_URL}/data`);
         
        if (!response.ok) {
          throw new Error("Failed to fetch brokers");
        }

        const dataes = await response.json();
           
        console.log("API response:", dataes);

        const brokerList = Array.isArray(dataes.message)
          ? dataes.message
          : [];

        setBrok(brokerList);
      } catch (error) {
        console.error("Error fetching brokers:", error);
      }
    };

    fetchBrokers();
  },[]);
  const handleSearch = async () => {
    if (!data || !datas) return;

    try {
      const response = await fetch("http://localhost:2000/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          datas,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to compare brokers");
      }

      const merge = await response.json();

      setBrokers(Array.isArray(merge) ? merge : []);
    } catch (error) {
      console.error("Compare error:", error);
    }
  };

  // Initial comparison
  useEffect(() => {
    if (brok.length >= 2) {
      const first = brok[0].name;
      const second = brok[1].name;

      fetch("http://localhost:2000/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: first,
          datas: second,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setBrokers(Array.isArray(result) ? result : []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [brok]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <Link
            href="/brokers"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <span className="text-lg">←</span>
            Back to Brokers
          </Link>

          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <span className="text-lg text-emerald-500">✓</span>
            Verified broker information
          </div>

        </div>
      </header>


      {/* HERO */}

      <section className="bg-white">

        <h1 className="pt-10 text-center text-2xl font-extrabold text-blue-500">
          Broker Comparison
        </h1>

        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">

          {/* BROKER SELECT */}

          <div className="mb-5 flex flex-col items-center justify-between gap-4 rounded-3xl bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-700 sm:flex-row sm:rounded-full sm:px-10">

            <div className="flex w-full flex-col items-center gap-4 sm:flex-row">

              <select
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full rounded-4xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 sm:w-100"
              >
                {brok
                 .filter((items) => items.name !== datas)
                .map((items) => (
                  <option
                    key={items._id}
                    value={items.name}
                  >
                    {items.name} Broker
                  </option>
                ))}
              </select>

              <span className="mx-2 text-xl">⇄</span>

              <select
                value={datas}
                onChange={(e) => setDatas(e.target.value)}
                className="w-full rounded-4xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 sm:w-100"
              >
                {brok
                  .filter((items) => items.name !== data)
                  .map((items) => (
                    <option
                      key={items._id}
                      value={items.name}
                    >
                      {items.name} Broker
                    </option>
                  ))}
              </select>

            </div>

            <button
              onClick={handleSearch}
              className="h-10 w-full rounded-lg border border-blue-500 px-6 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700 sm:w-25"
            >
              Search
            </button>

          </div>


          <h1 className="pt-7 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Compare Stock Brokers
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Compare brokerage charges, features, regulatory information and
            platform availability in one place.
          </p>


          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              {brokers.length} Brokers
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              30+ Comparison Points
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              Updated Information
            </span>

          </div>

        </div>
      </section>


      {/* COMPARISON */}

      <main className="mx-auto max-w-8xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <div className="min-w-[700px]">

              {/* BROKER HEADER */}

              <div className="grid grid-cols-[220px_repeat(2,minmax(180px,1fr))] border-b border-slate-200">

                <div className="flex items-end p-5 sm:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Compare
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Broker details
                    </p>
                  </div>
                </div>


                {brokers.map((broker, index) => (
                  <div
                    key={broker._id}
                    className={`border-l border-slate-100 p-4 text-center sm:p-6 ${
                      index === 0 ? "bg-blue-50/50" : ""
                    }`}
                  >

                    <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                      <img
                        src={broker.logo}
                        alt={broker.name}
                        className="max-h-[38px] max-w-[38px] object-contain"
                      />

                    </div>

                    <h3 className="mt-3 font-bold text-slate-900">
                      {broker.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-center gap-1">

                      <span className="text-lg text-yellow-400">
                        ★
                      </span>

                      <span className="text-sm font-bold">
                        {broker.rating}
                      </span>

                      <span className="text-xs text-slate-400">
                        / 5
                      </span>

                    </div>

                    <a
                      href={broker.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                    >
                      Open Account
                      <span>→</span>
                    </a>

                  </div>
                ))}

              </div>


              {/* CHARGES HEADER */}

              <SectionHeader
                icon="₹"
                title="Charges"
                description="Compare brokerage and account related charges"
              />


              <CompareRow
                label="Account Opening"
                brokers={brokers}
                getValue={(broker) => broker.accountOpeningFee}
              />

              <CompareRow
                label="AMC"
                brokers={brokers}
                getValue={(broker) => broker.maintenanceFee}
                gray
              />

              <CompareRow
                label="Equity Delivery"
                brokers={brokers}
                getValue={(broker) => broker.equityDelivery}
              />

              <CompareRow
                label="Intraday"
                brokers={brokers}
                getValue={(broker) => broker.intraday}
                gray
              />

              <CompareRow
                label="Futures"
                brokers={brokers}
                getValue={(broker) => broker.Futures}
              />

              <CompareRow
                label="Options"
                brokers={brokers}
                getValue={(broker) => broker.Options}
                gray
              />

              <CompareRow
                label="DP Charges"
                brokers={brokers}
                getValue={(broker) => broker.DpCharges}
              />


              {/* FEATURES */}

              <SectionHeader
                icon="⚡"
                title="Features"
                description="Trading tools and services available"
              />

              {tradingFeatures.map(([key, label], index) => (

                <div
                  key={key}
                  className={`grid grid-cols-[220px_repeat(2,minmax(180px,1fr))] border-b border-slate-200 ${
                    index % 2 === 1 ? "bg-slate-50" : ""
                  }`}
                >

                  <div className="p-4 text-sm font-medium text-slate-700 sm:p-5">
                    {label}
                  </div>

                  {brokers.map((broker) => {

                    const available =
                      broker.Trading?.[key] === true;

                    return (
                      <div
                        key={broker._id}
                        className="border-l border-slate-100 p-4 text-center sm:p-5"
                      >
                        {available ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 font-bold text-red-500">
                            ✕
                          </span>
                        )}
                      </div>
                    );
                  })}

                </div>

              ))}


              {/* TRUST */}

              <SectionHeader
                icon="✓"
                title="Trust & Registration"
                description="Regulatory and registration information"
              />

              <CompareRow
                label="SEBI Registered"
                brokers={brokers}
                getValue={() => (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                    ✓
                  </span>
                )}
                gray
              />

              <CompareRow
                label="SEBI Registration Number"
                brokers={brokers}
                getValue={(broker) => broker.sebiRegistrationNumber}
              />

              <CompareRow
                label="Exchange Memberships"
                brokers={brokers}
                getValue={() => (
                  <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-600">
                    BSE / NSE
                  </span>
                )}
                gray
              />

              <CompareRow
                label="Established"
                brokers={brokers}
                getValue={(broker) => broker.Established}
              />


              {/* USER EXPERIENCE */}

              <SectionHeader
                icon="★"
                title="User Experience"
                description="Platform experience and overall availability"
              />

              <CompareRow
                label="Rating"
                brokers={brokers}
                getValue={(broker) => (
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg text-yellow-400">
                      ★
                    </span>

                    <span className="font-bold text-slate-900">
                      {broker.rating}
                    </span>

                    <span className="text-xs text-slate-400">
                      / 5
                    </span>
                  </div>
                )}
                gray
              />


              {/* FEATURES COUNT */}

              <div className="grid grid-cols-[220px_repeat(2,minmax(180px,1fr))] border-t border-slate-200">

                <div className="p-5 sm:p-8">
                  <p className="text-sm font-bold text-slate-900">
                    Number of Features
                  </p>
                </div>

                {brokers.map((broker) => (

                  <div
                    key={broker._id}
                    className="border-l border-slate-100 p-5 text-center"
                  >

                    <span className="block font-bold text-blue-600">
                      {broker.features?.length || 0}
                    </span>

                    <button
                      onClick={() => setShowPopup(broker.features || [])}
                      className="font-bold text-green-500"
                    >
                      view
                    </button>

                  </div>

                ))}

              </div>


              {/* CTA */}

              <div className="grid grid-cols-[220px_repeat(2,minmax(180px,1fr))] border-t border-slate-200">

                <div className="p-5 sm:p-8">

                  <p className="text-sm font-bold text-slate-900">
                    Ready to start?
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Visit the broker
                  </p>

                </div>

                {brokers.map((broker) => (

                  <div
                    key={broker._id}
                    className="flex items-center justify-center border-l border-slate-100 p-5"
                  >

                    <a
                      href={broker.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[180px] rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-600"
                    >
                      Open {broker.name}
                    </a>

                  </div>

                ))}

              </div>

            </div>
          </div>
        </div>

      </main>


      {/* POPUP */}

      {showPopup !== null && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-lg font-bold">
                Broker Features
              </h2>

              <button
                onClick={() => setShowPopup(null)}
                className="text-xl text-gray-500"
              >
                ×
              </button>

            </div>


            <div className="space-y-2">

              {showPopup.map((item, index) => (
                <p
                  key={index}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  {index + 1}. {item}
                </p>
              ))}

            </div>


            <button
              onClick={() => setShowPopup(null)}
              className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white"
            >
              Close
            </button>

          </div>

        </div>

      )}


      <div className="mt-6 px-2">

        <p className="text-xs leading-5 text-slate-400">
          Information shown on this page is provided for comparison
          purposes. Brokerage charges, fees, features and regulatory
          information can change. Please verify the latest information
          with the respective broker before opening an account.
        </p>

      </div>

    </div>
  );
};


/* ----------------------------- */
/* REUSABLE COMPONENTS */
/* ----------------------------- */

const SectionHeader = ({ icon, title, description }) => {
  return (
    <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-8 sm:py-6">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
          {icon}
        </div>

        <div>

          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h2>

          <p className="text-xs text-slate-500 sm:text-sm">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
};


const CompareRow = ({
  label,
  brokers,
  getValue,
  gray = false,
}) => {
  return (
    <div
      className={`grid grid-cols-[220px_repeat(2,minmax(180px,1fr))] border-b border-slate-200 ${
        gray ? "bg-slate-50" : ""
      }`}
    >

      <div className="p-4 text-sm font-medium text-slate-700 sm:p-5">
        {label}
      </div>

      {brokers.map((broker) => (

        <div
          key={broker._id}
          className="border-l border-slate-100 p-4 text-center sm:p-5"
        >
          {getValue(broker)}
        </div>

      ))}

    </div>
  );
};

export default Compare; 
