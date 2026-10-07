


import Link from "next/link";
import Brok from "./component/Brok";
import { getBrokers } from "./lib/getBrokers";


const Home =async () => {
    
     const brokers = await getBrokers();


  return (<>

    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-4 py-20">

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Find the Right  
              <span className="text-blue-700">
              {" "}Stock Broker
              </span>
              {" "}for You
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-8">
              Compare India's popular stock brokers, brokerage charges,
              account fees and features in one simple place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <Link href="/brokers" className=" px-6 py-3.5  rounded-xl  bg-blue-700  text-white  font-semibold  hover:bg-blue-800 transition shadow-lg shadow-blue-700/20 ">
                Explore Brokers
              </Link>

              <Link  href="/compare-brokers"className=" px-6 py-3.5  rounded-xl border border-slate-300 bg-white text-slate-700  font-semibold hover:bg-slate-50  transition ">
                Compare Brokers
              </Link>

            </div>

            <p className="mt-5 text-xs text-slate-400">
              Information is provided for educational and comparison
              purposes.
            </p>

          </div>

        </div>
</section>

<Brok brokers={brokers}/>
<section className="py-20 bg-gradient-to-b from-slate-50 to-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* Header */}
    <div className="text-center mb-12">

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-4">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        SIMPLE COMPARISON
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        Compare Broker Charges
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-sm sm:text-base">
        Compare account opening, maintenance and delivery charges
        to understand the differences between brokers.
      </p>

    </div>


    {/* Comparison Card */}
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Desktop Table */}
      <div className="overflow-x-auto h-100 overflow-y-auto">

        <table className="w-full min-w-[750px]">

          {/* Table Head */}
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">

              <th className="text-left px-6 py-5 text-xs uppercase tracking-wider font-bold text-slate-500">
                Broker
              </th>

              <th className="text-center px-6 py-5 text-xs uppercase tracking-wider font-bold text-slate-500">
                Account Opening
              </th>

              <th className="text-center px-6 py-5 text-xs uppercase tracking-wider font-bold text-slate-500">
                Maintenance
              </th>

              <th className="text-center px-6 py-5 text-xs uppercase tracking-wider font-bold text-slate-500">
                Delivery
              </th>

              <th className="px-6 py-5"></th>

            </tr>
          </thead>
          <tbody>

            {brokers.map((broker, index) => (

              <tr
                key={broker.name}
                className="group border-b  last:border-0 border-slate-100 hover:bg-blue-50/40 transition duration-200"
              >

              
                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-blue-700 transition">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {broker.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-0.5">
                        Stock Broker
                      </p>
                    </div>

                  </div>

                </td>


                <td className="px-6 py-5 text-center">

                  <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-sm">
                    {broker.accountOpeningFee}
                  </span>

                </td>


            
                <td className="px-6 py-5 text-center">

                  <span className="text-slate-700 font-medium">
                    {broker.maintenanceFee}
                  </span>

                </td>


                <td className="px-6 py-5 text-center">

                  <span className="text-slate-700 font-medium">
                    {broker.equityDelivery}
                  </span>

                </td>


         
                <td className="px-6 py-5 text-right">

                  <Link
                    href="/compare-brokers"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-200 group-hover:shadow-md"
                  >
                    Compare
                    <span className="text-base transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>
    

          
        </table>

      </div>


      <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="text-center sm:text-left">

          <p className="font-semibold text-slate-800 text-sm">
            Want to compare more charges?
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Explore brokerage, AMC, delivery and other broker charges.
          </p>

        </div>

        <Link
          href="/compare-brokers"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          View Full Comparison
        </Link>

      </div>

    </div>


    {/* Disclaimer */}
    <p className="text-center text-xs text-slate-400 mt-5">
      Charges shown are for comparison purposes. Please verify the latest
      charges on the broker's official website before opening an account.
    </p>

  </div>
</section>
<section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800">

  {/* Decorative background elements */}
  <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl"></div>

  <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-semibold backdrop-blur-sm mb-6">

      <span className="w-2 h-2 rounded-full bg-white"></span>

      SMART BROKER DISCOVERY

    </div>


    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
      Find a Broker That Fits
      <span className="block text-blue-100">
        Your Trading Needs
      </span>
    </h2>


    {/* Description */}
    <p className="mt-5 max-w-2xl mx-auto text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed">
      Compare brokerage charges, account fees and key features
      of popular stock brokers before making your choice.
    </p>


    {/* CTA Buttons */}
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">

      <Link
        href="/brokers"
        className="
          group
          inline-flex
          items-center
          justify-center
          gap-2
          px-7
          py-3.5
          rounded-xl
          bg-white
          text-blue-700
          font-bold
          shadow-lg
          shadow-blue-950/20
          hover:bg-blue-50
          hover:-translate-y-0.5
          transition-all
          duration-200
        "
      >
        Explore Brokers

        <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>


      <Link
        href="/compare-brokers"
        className="
          inline-flex
          items-center
          justify-center
          px-7
          py-3.5
          rounded-xl
          border
          border-white/30
          bg-white/10
          text-white
          font-semibold
          backdrop-blur-sm
          hover:bg-white/20
          transition-all
          duration-200
        "
      >
        Compare Brokers
      </Link>

    </div>


    {/* Bottom trust points */}
    <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-blue-100">

      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
          ✓
        </span>
        Compare Charges
      </div>

      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
          ✓
        </span>
        Explore Features
      </div>

      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
          ✓
        </span>
        Make an Informed Choice
      </div>

    </div>

  </div>
</section>
      <section className="bg-white border-t border-slate-200">

        <div className="max-w-7xl mx-auto px-4 py-8">

          <p className="text-xs text-slate-400 leading-6">
            Disclaimer: NextGenMarkets is an independent informational
            and comparison platform. We may receive compensation from
            some partners when users open an account through links on
            our website. This does not change the information presented
            on the website. Brokerage charges, fees, products and
            services may change. Please verify the latest information
            on the broker's official website before making any decision.
          </p>

        </div>

      </section>

    </div>
      </>
  );
};

export default Home;

