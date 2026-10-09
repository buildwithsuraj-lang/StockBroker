import Link from "next/link";
import { getBrokers } from "../lib/getBrokers";
const brokers =async() => {
  const brokerdata = await getBrokers()||null;

  return (
    <>
       
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mx-10 mt-10">

          <div>

            <p className="font-bold text-indigo-600 ">
              SEBI REGISTERED BROKERS
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Your Gateway to Better Investing.
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Discover trusted trading platforms, compare brokers,
              brokerage charges, features and ratings before you invest.
            </p>

          </div>
        </div>
        
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-3 mx-10">
    <div className="mt-5">

          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Online Trading
            </p>

            <h2 className="mt-1 text-3xl font-black text-slate-900">
              Discount Stock Brokers
            </h2>

          </div>

        </div>
   </div>
     <div className="flex w-auto mx-8 mb-10">

              {brokerdata.map((items) => (

                <div
                  key={items._id}
                  className="
                    min-w-0
                    flex-[0_0_100%]
                    px-2
                    mt-10
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]
                  "
                >

                  {/* =================================================
                      BROKER CARD
                  ================================================= */}

                  <div
                    className="
                      group
                      relative
                      h-full
                    
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-indigo-200
                      hover:shadow-2xl
                      hover:shadow-indigo-100
                    "
                  >

                    {/* Background decoration */}

                    <div
                      className="
                        absolute
                        -right-20
                        -top-20
                        h-52
                        w-52
                        rounded-full
                        bg-indigo-50
                        transition-all
                        duration-500
                        group-hover:scale-150
                      "
                    />


                    <div className="relative">

                      {/* =================================================
                          LOGO + BROKER NAME
                      ================================================= */}

                      <div className="flex items-start justify-between">

                        {/* Logo */}

                        <div
                          className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-slate-950
                            via-slate-900
                            to-indigo-950
                            shadow-lg
                            shadow-slate-900/20
                          "
                        >

                          <div
                            className="
                              flex
                              h-11
                              w-11
                              items-center
                              justify-center
                              rounded-xl
                              bg-white
                              shadow-md
                              transition-transform
                              duration-300
                              group-hover:scale-105
                            "
                          >

                            <img
                              src={items.logo}
                              alt={items.name}
                              className="h-8 w-8 object-contain"
                            />

                          </div>

                        </div>


                        {/* Broker Badge */}

                        <span
                          className="
                            rounded-full
                            bg-indigo-50
                            px-3
                            py-1
                            text-xs
                            font-bold
                            text-indigo-600
                          "
                        >
                          {items.name}
                        </span>

                      </div>


                      {/* =================================================
                          NAME
                      ================================================= */}

                      <h3 className="mt-6 text-2xl font-black text-slate-900">
                        {items.name}
                      </h3>


                      {/* =================================================
                          DESCRIPTION
                      ================================================= */}

                      <p
                        className="
                          mt-2
                          min-h-[48px]
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        {items.description || items.slug}
                      </p>


                      {/* =================================================
                          RATING
                      ================================================= */}

                      <div className="mt-5 flex items-center gap-2">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-amber-50
                            px-2
                            py-1
                          "
                        >

                          <span className="text-sm font-bold text-slate-800">
                            {items.rating}
                          </span>


                          <div className="flex gap-1">

                            {[
                              ...Array(
                                Math.round(
                                  Number(items.rating) || 0
                                )
                              ),
                            ].map((_, i) => (

                              <span
                                key={i}
                                className="text-sm text-yellow-400"
                              >
                                ★
                              </span>

                            ))}

                          </div>

                        </div>


                        <span className="text-xs text-slate-400">
                          User Rating
                        </span>

                      </div>


                      {/* =================================================
                          DETAILS
                      ================================================= */}

                      <div className="mt-5 grid grid-cols-2 gap-3">

                        {/* Type */}

                        <div
                          className="
                            rounded-2xl
                            bg-slate-50
                            p-3
                          "
                        >

                          <p className="text-xs text-slate-400">
                            Type
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {items.type}
                          </p>

                        </div>


                        {/* AMC */}

                        <div
                          className="
                            rounded-2xl
                            bg-slate-50
                            p-3
                          "
                        >

                          <p className="text-xs text-slate-400">
                            Maintenance / AMC
                          </p>

                          <p className="mt-1 text-sm font-bold text-indigo-600">
                            {items.maintenanceFee}
                          </p>

                        </div>

                      </div>


                      {/* =================================================
                          SEBI REGISTERED
                      ================================================= */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-slate-500
                        "
                      >

                        <span className="text-base text-green-500">
                          ✓
                        </span>

                        SEBI Registered Broker

                      </div>


                      {/* =================================================
                          VIEW BROKER
                      ================================================= */}

                      <Link
                        href={`/broker/${items.name}`}
                        className="
                          mt-6
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-slate-950
                          px-5
                          py-3
                          text-sm
                          font-bold
                          text-white
                          transition-all
                          hover:bg-indigo-600
                        "
                      >

                        View Broker

                        <span className="text-lg">
                          →
                        </span>

                      </Link>


                      {/* =================================================
                          AFFILIATE BUTTON
                      ================================================= */}

                      <a
                        href={items.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          mt-2
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-indigo-600
                          px-5
                          py-3
                          text-sm
                          font-bold
                          text-white
                          transition-all
                          hover:bg-indigo-700
                        "
                      >

                        Open Account

                        <span className="text-lg">
                          ↗
                        </span>

                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

               

    </>
  )
}

export default brokers
