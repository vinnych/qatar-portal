"use client";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  year: number;
  month: number;
  hijriMonth: string;
  hijriYear: string;
}

export default function HijriNav({ year, month, hijriMonth, hijriYear }: Props) {
  const prev = month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
  const next = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };

  return (
    <div className="flex items-center justify-between mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
      <a
        href={`/hijri-calendar?year=${prev.year}&month=${prev.month}`}
        className="text-rose-700 hover:text-rose-900 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-rose-50 transition-colors min-w-[44px] text-center"
      >
        ← Prev
      </a>
      <div className="text-center">
        <p className="font-bold text-gray-900">{MONTH_NAMES[month - 1]} {year}</p>
        {hijriMonth && (
          <p className="text-xs text-amber-700">{hijriMonth} {hijriYear} AH</p>
        )}
      </div>
      <a
        href={`/hijri-calendar?year=${next.year}&month=${next.month}`}
        className="text-rose-700 hover:text-rose-900 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-rose-50 transition-colors min-w-[44px] text-center"
      >
        Next →
      </a>
    </div>
  );
}
