export default function FooterScenery() {
  return (
    <div className="w-full overflow-hidden leading-none pointer-events-none select-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 180"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        className="w-full h-auto"
      >
        {/* Ground / sand dune */}
        <ellipse cx="720" cy="195" rx="900" ry="55" fill="#e7d5a8" />
        <ellipse cx="300" cy="200" rx="380" ry="40" fill="#ddc990" />
        <ellipse cx="1200" cy="200" rx="320" ry="38" fill="#ddc990" />

        {/* ── Far-left small palm ── */}
        {/* trunk */}
        <path d="M120 180 Q124 140 118 100" stroke="#8B6914" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* fronds */}
        <path d="M118 100 Q95 80 72 90" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M118 100 Q100 72 88 58" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M118 100 Q118 70 114 52" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M118 100 Q135 72 148 60" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M118 100 Q138 82 162 88" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* frond leaves */}
        <path d="M72 90 Q82 84 95 80" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M88 58 Q100 64 108 72" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M148 60 Q140 67 132 74" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M162 88 Q150 84 140 82" stroke="#40916c" strokeWidth="2" fill="none" />
        {/* dates cluster */}
        <circle cx="118" cy="103" r="3" fill="#c77d0a" />
        <circle cx="114" cy="107" r="2.5" fill="#b56c08" />
        <circle cx="122" cy="106" r="2.5" fill="#c77d0a" />

        {/* ── Left main tall palm ── */}
        <path d="M260 182 Q268 138 255 78" stroke="#7a5c10" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* trunk marks */}
        <path d="M263 160 Q256 158 263 155" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        <path d="M261 140 Q254 138 261 135" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        <path d="M259 118 Q252 116 259 113" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        {/* fronds */}
        <path d="M255 78 Q220 52 188 62" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M255 78 Q228 42 218 22" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M255 78 Q255 38 248 14" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M255 78 Q278 42 292 20" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M255 78 Q282 52 314 58" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M255 78 Q240 68 210 82" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* frond leaf texture */}
        <path d="M188 62 Q205 56 220 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M218 22 Q232 34 244 50" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M248 14 Q250 30 251 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M292 20 Q282 34 270 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M314 58 Q298 54 282 54" stroke="#40916c" strokeWidth="2" fill="none" />
        {/* dates */}
        <circle cx="256" cy="83" r="4" fill="#c77d0a" />
        <circle cx="250" cy="88" r="3.5" fill="#b56c08" />
        <circle cx="262" cy="87" r="3.5" fill="#c77d0a" />
        <circle cx="255" cy="92" r="3" fill="#d4870b" />

        {/* ── Center-left leaning palm ── */}
        <path d="M500 182 Q510 145 530 95" stroke="#8B6914" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M530 95 Q500 72 472 80" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M530 95 Q510 65 500 48" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M530 95 Q532 62 528 42" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M530 95 Q550 65 562 50" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M530 95 Q555 76 578 78" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="531" cy="98" r="3.5" fill="#c77d0a" />
        <circle cx="526" cy="103" r="3" fill="#b56c08" />
        <circle cx="536" cy="102" r="3" fill="#c77d0a" />

        {/* ── Center large palm (tallest) ── */}
        <path d="M720 183 Q730 130 718 55" stroke="#7a5c10" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M722 165 Q714 162 722 158" stroke="#6b4f0e" strokeWidth="2.5" fill="none" />
        <path d="M720 140 Q712 137 720 133" stroke="#6b4f0e" strokeWidth="2.5" fill="none" />
        <path d="M719 112 Q711 109 719 105" stroke="#6b4f0e" strokeWidth="2.5" fill="none" />
        {/* fronds */}
        <path d="M718 55 Q676 24 640 34" stroke="#1b4332" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q692 14 678 -4" stroke="#1b4332" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q716 12 710 -8" stroke="#1b4332" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q742 12 758 -6" stroke="#1b4332" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q748 20 778 28" stroke="#1b4332" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q695 44 668 54" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M718 55 Q742 44 768 52" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* leaf texture */}
        <path d="M640 34 Q662 26 682 26" stroke="#40916c" strokeWidth="2.5" fill="none" />
        <path d="M678 -4 Q696 14 706 36" stroke="#40916c" strokeWidth="2.5" fill="none" />
        <path d="M710 -8 Q712 14 714 38" stroke="#40916c" strokeWidth="2.5" fill="none" />
        <path d="M758 -6 Q744 14 730 36" stroke="#40916c" strokeWidth="2.5" fill="none" />
        <path d="M778 28 Q758 24 738 28" stroke="#40916c" strokeWidth="2.5" fill="none" />
        {/* dates */}
        <circle cx="719" cy="62" r="5" fill="#c77d0a" />
        <circle cx="712" cy="68" r="4" fill="#b56c08" />
        <circle cx="726" cy="67" r="4" fill="#c77d0a" />
        <circle cx="718" cy="73" r="3.5" fill="#d4870b" />
        <circle cx="710" cy="75" r="3" fill="#b56c08" />

        {/* ── Center-right leaning palm ── */}
        <path d="M940 182 Q930 145 910 95" stroke="#8B6914" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M910 95 Q880 72 852 78" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M910 95 Q892 65 882 48" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M910 95 Q910 62 906 42" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M910 95 Q930 65 942 50" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M910 95 Q936 76 960 78" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="910" cy="98" r="3.5" fill="#c77d0a" />
        <circle cx="904" cy="103" r="3" fill="#b56c08" />
        <circle cx="916" cy="102" r="3" fill="#c77d0a" />

        {/* ── Right main tall palm ── */}
        <path d="M1180 182 Q1172 138 1185 78" stroke="#7a5c10" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M1177 160 Q1184 158 1177 155" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        <path d="M1179 140 Q1186 138 1179 135" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        <path d="M1181 118 Q1188 116 1181 113" stroke="#6b4f0e" strokeWidth="2" fill="none" />
        <path d="M1185 78 Q1220 52 1252 62" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1185 78 Q1212 42 1222 22" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1185 78 Q1185 38 1192 14" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1185 78 Q1162 42 1148 20" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1185 78 Q1158 52 1126 58" stroke="#1b4332" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1185 78 Q1200 68 1230 82" stroke="#1b4332" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M1252 62 Q1236 56 1220 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M1222 22 Q1208 34 1196 50" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M1192 14 Q1190 30 1189 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M1148 20 Q1158 34 1170 52" stroke="#40916c" strokeWidth="2" fill="none" />
        <path d="M1126 58 Q1142 54 1158 54" stroke="#40916c" strokeWidth="2" fill="none" />
        <circle cx="1184" cy="83" r="4" fill="#c77d0a" />
        <circle cx="1190" cy="88" r="3.5" fill="#b56c08" />
        <circle cx="1178" cy="87" r="3.5" fill="#c77d0a" />
        <circle cx="1185" cy="92" r="3" fill="#d4870b" />

        {/* ── Far-right small palm ── */}
        <path d="M1320 180 Q1316 140 1322 100" stroke="#8B6914" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M1322 100 Q1345 80 1368 90" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1322 100 Q1340 72 1352 58" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1322 100 Q1322 70 1326 52" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1322 100 Q1305 72 1292 60" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1322 100 Q1302 82 1278 88" stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="1322" cy="103" r="3" fill="#c77d0a" />
        <circle cx="1318" cy="107" r="2.5" fill="#b56c08" />
        <circle cx="1326" cy="106" r="2.5" fill="#c77d0a" />

        {/* Ground fill to hide SVG bottom edge */}
        <rect x="0" y="172" width="1440" height="10" fill="#e7d5a8" />
      </svg>
    </div>
  );
}
