export default function FooterScenery() {
  const bgCityPath = `M 0 260
    L 15 260 L 15 170 L 30 170 L 30 260
    L 45 260 L 45 190 L 55 180 L 70 180 L 70 260
    L 90 260 L 90 140 L 110 140 L 110 260
    L 140 260 L 140 200 L 160 200 L 160 260
    L 180 260 L 180 150 L 195 150 L 195 120 L 210 120 L 210 260
    L 230 260 L 230 180 L 260 180 L 260 260
    L 270 260 L 270 160 L 290 160 L 290 260
    L 310 260 L 310 190 L 330 190 L 330 260
    L 380 260 L 380 150 L 410 150 L 410 260
    L 430 260 L 430 170 L 460 170 L 460 260
    L 480 260 L 480 140 L 510 140 L 510 260
    L 530 260 L 530 180 L 550 180 L 550 260
    L 580 260 L 580 160 L 610 160 L 610 260
    L 630 260 L 630 190 L 650 190 L 650 260
    L 680 260 L 680 130 L 710 130 L 710 260
    L 730 260 L 730 170 L 760 170 L 760 260
    L 780 260 L 780 110 L 810 110 L 810 260
    L 830 260 L 830 180 L 860 180 L 860 260
    L 880 260 L 880 150 L 910 150 L 910 260
    L 930 260 L 930 200 L 960 200 L 960 260
    L 980 260 L 980 140 L 1000 140 L 1000 260
    L 1020 260 L 1020 180 L 1050 180 L 1050 260
    L 1070 260 L 1070 160 L 1100 160 L 1100 260
    L 1120 260 L 1120 130 L 1140 130 L 1140 260
    L 1160 260 L 1160 190 L 1190 190 L 1190 260
    L 1210 260 L 1210 150 L 1240 150 L 1240 260
    L 1260 260 L 1260 180 L 1290 180 L 1290 260
    L 1310 260 L 1310 160 L 1330 160 L 1330 260
    L 1350 260 L 1350 200 L 1380 200 L 1380 260
    L 1400 260 L 1400 170 L 1420 170 L 1420 260
    L 1440 260 Z`

  return (
    <div
      className="w-full overflow-hidden leading-none pointer-events-none select-none"
      style={{ height: "220px" }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 265"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky — Qatar sunset */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#faf9f6" />
            <stop offset="30%" stopColor="#F5D8C0" />
            <stop offset="65%" stopColor="#C8614A" />
            <stop offset="100%" stopColor="#6B1A30" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="18%" cy="88%" r="55%">
            <stop offset="0%" stopColor="#F5C060" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#E87040" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#8B1A3C" stopOpacity="0" />
          </radialGradient>

          {/* Building gradients */}
          <linearGradient id="purpleTowerGrad" x1="0%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#D163D6" />
            <stop offset="50%" stopColor="#8F35B8" />
            <stop offset="100%" stopColor="#3B1C63" />
          </linearGradient>
          <linearGradient id="goldTowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C340" />
            <stop offset="50%" stopColor="#A5832E" />
            <stop offset="100%" stopColor="#141E38" />
          </linearGradient>
          <linearGradient id="glassCyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6DC5D1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#192A4D" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="glassBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4B6A99" />
            <stop offset="100%" stopColor="#0F1626" />
          </linearGradient>
          <linearGradient id="darkBuildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#283353" />
            <stop offset="100%" stopColor="#090C15" />
          </linearGradient>
          <linearGradient id="silverTower" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B5878" />
            <stop offset="30%" stopColor="#A2AECE" />
            <stop offset="70%" stopColor="#55658A" />
            <stop offset="100%" stopColor="#1F263A" />
          </linearGradient>

          {/* Top fade — blends into page background */}
          <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#faf9f6" stopOpacity="1" />
            <stop offset="60%" stopColor="#faf9f6" stopOpacity="0" />
          </linearGradient>

          {/* Window patterns */}
          <pattern id="windowsBlue" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#131B2D" />
            <rect x="1" y="1" width="4" height="4" fill="#425C8F" opacity="0.6" />
          </pattern>
          <pattern id="windowsCyan" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#0C1322" />
            <rect x="1" y="1" width="6" height="3" fill="#6DC5D1" opacity="0.5" />
            <rect x="1" y="5" width="6" height="2" fill="#4B6A99" opacity="0.3" />
          </pattern>

          {/* Reusable paths */}
          <path id="bgCityPath" d={bgCityPath} />

          <g id="cityArchitecture">
            {/* Gold Tower (World Trade Center) */}
            <polygon points="175,260 175,90 200,80 215,80 215,260" fill="url(#goldTowerGrad)" />
            <polygon points="200,80 215,80 215,260 200,260" fill="#1A2238" />
            <line x1="185" y1="100" x2="185" y2="260" stroke="#FFD1A9" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
            <line x1="192" y1="95" x2="192" y2="260" stroke="#FFD1A9" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />

            {/* Glass towers — left */}
            <rect x="235" y="130" width="35" height="130" fill="url(#windowsCyan)" />
            <rect x="235" y="130" width="35" height="130" fill="url(#glassCyanGrad)" opacity="0.5" />
            <path d="M 235 130 L 252 115 L 270 130 Z" fill="#6DC5D1" opacity="0.8" />
            <rect x="285" y="110" width="40" height="150" fill="url(#windowsBlue)" />
            <rect x="285" y="110" width="40" height="150" fill="url(#glassBlueGrad)" opacity="0.6" />
            <rect x="282" y="105" width="46" height="5" fill="#A88BCE" />

            {/* Center-left density */}
            <rect x="420" y="140" width="25" height="120" fill="url(#darkBuildingGrad)" />
            <line x1="425" y1="140" x2="425" y2="260" stroke="#8F35B8" strokeWidth="2" strokeDasharray="3 4" />
            <line x1="438" y1="140" x2="438" y2="260" stroke="#8F35B8" strokeWidth="2" strokeDasharray="3 4" />
            <rect x="450" y="100" width="30" height="160" fill="url(#glassBlueGrad)" />
            <rect x="450" y="100" width="30" height="160" fill="url(#windowsBlue)" opacity="0.7" />
            <rect x="520" y="160" width="40" height="100" fill="url(#windowsCyan)" />
            <rect x="520" y="160" width="40" height="100" fill="url(#glassCyanGrad)" opacity="0.5" />

            {/* Purple triangular spire (Al Fardan) */}
            <polygon points="460,260 500,60 540,260" fill="url(#purpleTowerGrad)" />
            <polygon points="500,60 540,260 500,260" fill="#1F0E3D" opacity="0.5" />
            <line x1="500" y1="60" x2="500" y2="260" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
            <path d="M 480 160 L 520 160 M 470 210 L 530 210 M 490 110 L 510 110 M 475 260 L 500 130 L 525 260" stroke="#D163D6" strokeWidth="1" fill="none" opacity="0.4" />

            {/* Center glass complex */}
            <rect x="630" y="120" width="45" height="140" fill="url(#windowsBlue)" />
            <rect x="630" y="120" width="45" height="140" fill="url(#darkBuildingGrad)" opacity="0.7" />
            <polygon points="630,120 652,100 675,120" fill="#283353" />

            {/* Palm Tower */}
            <polygon points="760,110 775,90 790,110 790,260 760,260" fill="url(#glassBlueGrad)" />
            <polygon points="775,90 790,110 790,260 775,260" fill="#0D111D" opacity="0.6" />
            <line x1="775" y1="70" x2="775" y2="90" stroke="#A2AECE" strokeWidth="2" />
            <rect x="760" y="110" width="30" height="150" fill="url(#windowsBlue)" opacity="0.5" />

            {/* Al Bidda Tower */}
            <path d="M 810 100 L 840 100 L 850 260 L 800 260 Z" fill="url(#silverTower)" opacity="0.9" />
            <path d="M 825 100 L 840 100 L 850 260 L 810 260 Z" fill="#141E38" opacity="0.7" />
            <line x1="825" y1="100" x2="810" y2="260" stroke="#6DC5D1" strokeWidth="1.5" opacity="0.8" />
            <line x1="835" y1="100" x2="830" y2="260" stroke="#6DC5D1" strokeWidth="1.5" opacity="0.8" />

            {/* Tornado Tower */}
            <path d="M 870 260 Q 890 150 880 80 L 920 80 Q 910 150 930 260 Z" fill="url(#glassCyanGrad)" />
            <path d="M 885 90 L 915 110 M 882 110 L 918 135 M 880 135 L 920 165 M 878 165 L 922 200 M 875 200 L 925 240 M 872 240 L 928 260" stroke="#1A223A" strokeWidth="1.5" fill="none" />
            <path d="M 915 90 L 885 110 M 918 110 L 882 135 M 920 135 L 880 165 M 922 165 L 878 200 M 925 200 L 875 240 M 928 240 L 872 260" stroke="#1A223A" strokeWidth="1.5" fill="none" />

            {/* Burj Doha (Silver Bullet) */}
            <path d="M 950 260 L 950 140 C 950 80 1000 80 1000 140 L 1000 260 Z" fill="url(#silverTower)" />
            <path d="M 975 85 C 990 85 1000 110 1000 140 L 1000 260 L 975 260 Z" fill="#0D111D" opacity="0.5" />
            <path d="M 950 140 C 950 80 1000 80 1000 140" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
            <path d="M 953 140 L 997 140 M 951 160 L 999 160 M 950 180 L 1000 180 M 950 200 L 1000 200 M 950 220 L 1000 220 M 950 240 L 1000 240" stroke="#1F263A" strokeWidth="1.5" opacity="0.6" />

            {/* Right side towers */}
            <rect x="1050" y="130" width="35" height="130" fill="url(#windowsBlue)" />
            <rect x="1050" y="130" width="35" height="130" fill="url(#glassBlueGrad)" opacity="0.5" />
            <rect x="1110" y="160" width="45" height="100" fill="url(#darkBuildingGrad)" />
            <rect x="1110" y="160" width="45" height="100" fill="url(#windowsCyan)" opacity="0.6" />
            <polygon points="1190,140 1205,120 1220,140 1220,260 1190,260" fill="url(#silverTower)" />
            <rect x="1195" y="145" width="20" height="115" fill="#0D111D" opacity="0.8" />
            <rect x="1270" y="150" width="40" height="110" fill="url(#windowsBlue)" />
            <rect x="1270" y="150" width="40" height="110" fill="url(#glassCyanGrad)" opacity="0.4" />
            <rect x="1350" y="180" width="30" height="80" fill="url(#darkBuildingGrad)" />
            <line x1="1355" y1="180" x2="1355" y2="260" stroke="#FFD1A9" strokeWidth="2" strokeDasharray="2 3" opacity="0.7" />
            <line x1="1375" y1="180" x2="1375" y2="260" stroke="#FFD1A9" strokeWidth="2" strokeDasharray="2 3" opacity="0.7" />
          </g>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="1440" height="260" fill="url(#skyGrad)" />
        <rect x="0" y="0" width="1440" height="260" fill="url(#sunGlow)" />


        {/* Background cityscape silhouette */}
        <use href="#bgCityPath" fill="#141E38" opacity="0.95" />

        {/* Detailed foreground architecture */}
        <use href="#cityArchitecture" />

        {/* Stone-50 fade — seamless blend into page background */}
        <rect x="0" y="0" width="1440" height="70" fill="url(#topFade)" />
      </svg>
    </div>
  )
}
