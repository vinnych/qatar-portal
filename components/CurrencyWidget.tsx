import { getQARRates } from "@/lib/currency";

export default async function CurrencyWidget() {
  const data = await getQARRates();

  if (!data) {
    return (
      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 flex items-center justify-center text-sm text-gray-400">
        Exchange rates unavailable
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wide">
            QAR Exchange Rates
          </span>
          <p className="text-xs text-gray-400 mt-0.5">1 Qatari Riyal equals</p>
        </div>
        <span className="text-2xl">🇶🇦</span>
      </div>

      {/* Rates grid */}
      <div className="grid grid-cols-2 gap-2">
        {data.rates.map((rate) => (
          <div
            key={rate.code}
            className="flex items-center justify-between bg-stone-50 rounded-xl px-3 py-2 border border-stone-100"
          >
            <span className="flex items-center gap-1.5 text-sm text-gray-700">
              <span>{rate.flag}</span>
              <span className="font-medium">{rate.code}</span>
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {rate.value < 1 ? rate.value.toFixed(4) : rate.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-right">Updated hourly</p>
    </div>
  );
}
