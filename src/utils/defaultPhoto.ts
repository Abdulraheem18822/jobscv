/**
 * Professional White-Background European Standard Passport Photo Asset
 * Standard Europass 35mm x 45mm ratio (aspect ratio ~ 7:9) with clean white background.
 */
export const DEFAULT_WHITE_BG_PASSPORT_PHOTO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 450" width="350" height="450">
  <!-- Pure White Background -->
  <rect width="350" height="450" fill="#FFFFFF"/>
  
  <!-- Subtle gradient backdrop for soft lighting -->
  <radialGradient id="lightGrad" cx="50%" cy="38%" r="65%">
    <stop offset="0%" stop-color="#FFFFFF" />
    <stop offset="75%" stop-color="#FDFDFD" />
    <stop offset="100%" stop-color="#F4F4F5" />
  </radialGradient>
  <rect width="350" height="450" fill="url(#lightGrad)"/>

  <!-- Subtle shadow behind shoulders -->
  <ellipse cx="175" cy="440" rx="140" ry="30" fill="#E4E4E7" opacity="0.4"/>

  <!-- Dark Formal Suit Jacket (Navy / Charcoal) -->
  <path d="M 40 450 L 70 340 C 85 305, 115 285, 145 280 L 175 330 L 205 280 C 235 285, 265 305, 280 340 L 310 450 Z" fill="#1E293B"/>
  <!-- Lapel Left -->
  <path d="M 105 315 L 140 280 L 175 350 L 150 450 L 80 450 Z" fill="#0F172A"/>
  <!-- Lapel Right -->
  <path d="M 245 315 L 210 280 L 175 350 L 200 450 L 270 450 Z" fill="#0F172A"/>

  <!-- Crisp Formal White Shirt Collar -->
  <polygon points="175,340 142,275 160,265 175,295 190,265 208,275" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

  <!-- Tie (Deep Burgundy / Amber Accent) -->
  <polygon points="175,295 170,305 180,305" fill="#B45309"/>
  <polygon points="170,305 180,305 184,390 175,415 166,390" fill="#92400E"/>

  <!-- Neck -->
  <path d="M 152 225 L 152 275 C 160 282, 190 282, 198 275 L 198 225 Z" fill="#D4A373"/>
  <path d="M 155 245 C 165 258, 185 258, 195 245 L 195 260 C 185 270, 165 270, 155 260 Z" fill="#C68B59" opacity="0.3"/>

  <!-- Head / Face (Warm Skin Tone) -->
  <ellipse cx="175" cy="180" rx="60" ry="76" fill="#D4A373"/>

  <!-- Ears -->
  <ellipse cx="114" cy="185" rx="9" ry="18" fill="#C68B59"/>
  <ellipse cx="236" cy="185" rx="9" ry="18" fill="#C68B59"/>

  <!-- Hair (Neat Professional Short Cut) -->
  <path d="M 115 175 C 112 120, 130 95, 175 95 C 220 95, 238 120, 235 175 C 230 145, 218 135, 175 135 C 132 135, 120 145, 115 175 Z" fill="#1C1917"/>
  <path d="M 115 165 C 120 135, 140 125, 175 125 C 210 125, 230 135, 235 165 C 233 115, 215 100, 175 100 C 135 100, 117 115, 115 165 Z" fill="#0C0A09"/>

  <!-- Eyebrows -->
  <path d="M 135 156 Q 148 152 160 156" stroke="#1C1917" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 190 156 Q 202 152 215 156" stroke="#1C1917" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Eyes -->
  <ellipse cx="148" cy="168" rx="6.5" ry="4.5" fill="#FFFFFF"/>
  <circle cx="148" cy="168" r="3.2" fill="#292524"/>
  <circle cx="149" cy="167" r="1" fill="#FFFFFF"/>

  <ellipse cx="202" cy="168" rx="6.5" ry="4.5" fill="#FFFFFF"/>
  <circle cx="202" cy="168" r="3.2" fill="#292524"/>
  <circle cx="203" cy="167" r="1" fill="#FFFFFF"/>

  <!-- Nose -->
  <path d="M 175 165 L 173 194 Q 175 198 179 194" stroke="#B07D4F" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Mustache / Clean trim -->
  <path d="M 160 210 Q 175 213 190 210" stroke="#1C1917" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>

  <!-- Mouth (Neutral, Confident Smile) -->
  <path d="M 162 218 Q 175 224 188 218" stroke="#9A3412" stroke-width="2.2" fill="none" stroke-linecap="round"/>

  <!-- Outer Passport Photo Guide Border -->
  <rect x="1" y="1" width="348" height="448" fill="none" stroke="#E2E8F0" stroke-width="2"/>
</svg>
`)}`;

export const DEFAULT_PASSPORT_PHOTO = DEFAULT_WHITE_BG_PASSPORT_PHOTO;
