/**
 * Simplified but geographically accurate SVG paths for Japan's main islands.
 * Based on Natural Earth 1:110m data, simplified and projected to SVG coordinates.
 * ViewBox: 0 0 500 700
 *
 * Coordinate system: x increases eastward, y increases southward (SVG convention).
 * Approximate Mercator projection centered on Japan (130-146°E, 30-46°N).
 */

// Hokkaido — northernmost main island
export const hokkaidoPath =
  'M 330 72 L 338 62 L 352 55 L 365 50 L 380 48 L 395 50 L 408 56 ' +
  'L 418 65 L 425 76 L 428 88 L 427 100 L 422 112 L 414 122 ' +
  'L 404 130 L 392 135 L 378 138 L 365 140 L 354 142 ' +
  'L 342 140 L 332 134 L 324 126 L 318 116 L 315 104 ' +
  'L 314 92 L 318 82 L 325 74 Z'

// Honshu — largest main island, distinctive arc shape
export const honshuPath =
  'M 338 158 L 348 152 L 360 148 L 372 150 L 382 156 ' +
  'L 388 164 L 392 174 L 394 186 L 392 198 ' + // Northern Honshu (Tohoku)
  'L 388 210 L 384 220 L 380 230 L 378 240 ' +
  'L 378 252 L 380 264 L 386 274 ' + // Kanto bulge (Tokyo area)
  'L 384 286 L 378 296 L 370 306 L 360 314 ' + // Chubu
  'L 348 322 L 336 328 L 324 334 L 312 338 ' + // Kinki (Kyoto/Osaka)
  'L 298 342 L 284 344 L 270 346 L 256 344 ' + // Chugoku
  'L 244 340 L 234 332 L 226 322 L 222 310 ' + // Western tip
  'L 222 298 L 226 286 L 234 276 L 244 268 ' + // South coast Chugoku
  'L 256 262 L 268 258 L 280 254 L 292 248 ' +
  'L 304 242 L 314 234 L 324 224 L 332 212 ' + // South coast Chubu
  'L 338 200 L 342 188 L 344 176 L 342 166 ' +
  'L 340 160 Z'

// Shikoku — smallest of the 4 main islands
export const shikokuPath =
  'M 268 358 L 280 352 L 294 350 L 308 352 L 320 358 ' +
  'L 326 368 L 328 380 L 324 390 L 316 398 ' +
  'L 304 402 L 290 404 L 278 400 L 268 394 ' +
  'L 262 384 L 260 372 L 262 362 Z'

// Kyushu — southwestern main island
export const kyushuPath =
  'M 218 348 L 230 342 L 242 344 L 250 352 ' +
  'L 254 364 L 252 376 L 248 388 L 242 400 ' +
  'L 234 410 L 224 418 L 212 422 L 200 420 ' +
  'L 190 414 L 184 404 L 182 392 L 184 380 ' +
  'L 190 368 L 198 358 L 208 350 Z'

// Okinawa main island (small, far south) — optional accent
export const okinawaPath =
  'M 148 590 L 152 580 L 156 572 L 160 566 ' +
  'L 162 574 L 160 584 L 156 592 L 150 596 Z'

// Route: Tokyo → Kyoto → Osaka (along south coast of Honshu)
export const routePath =
  'M 382 272 Q 370 290 354 308 Q 340 322 324 334 L 316 338 Q 312 340 308 342'

// City coordinates (positioned on the coastline)
export const cityPositions = {
  tokyo: { x: 382, y: 272, name: 'Токио' },
  kyoto: { x: 316, y: 338, name: 'Киото' },
  osaka: { x: 308, y: 342, name: 'Осака' },
} as const
