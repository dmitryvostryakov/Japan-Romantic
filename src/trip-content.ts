export type ImageAsset = {
  src: string
  alt: string
  creditLabel: string
  creditUrl: string
}

export type TableRow = {
  id: string
}

export type CityMoment = {
  name: string
  description: string
  image?: ImageAsset
}

export type SightseeingSpot = {
  name: string
  description: string
  station?: string
}

export type SightseeingCategory = {
  label: string
  spots: SightseeingSpot[]
}

export type MustSee = {
  name: string
  why: string
}

export type CrowdHack = {
  tip: string
}

export type DayTrip = {
  destination: string
  duration: string
  highlights: Array<{ name: string; description: string }>
}

export type SuggestedDay = {
  label: string
  theme: string
  flow: string[]
}

export type FoodNote = {
  title: string
  body: string
  priceHint?: string
}

export type PhotoWalkStop = {
  spot: string
  tip: string
}

export type PhotoWalk = {
  title: string
  duration: string
  bestTime: string
  stops: PhotoWalkStop[]
}

export type PhotoInspiration = {
  title: string
  mood: string
  spots: Array<{ location: string; idea: string }>
}

export type CityChapter = {
  slug: string
  label: string
  dateRange: string
  theme: string
  base: string
  goldenHour: {
    am: string
    pm: string
  }
  image: ImageAsset
  am: CityMoment[]
  pm: CityMoment[]
  dining: CityMoment[]
  sightseeing: SightseeingCategory[]
  mustSee: MustSee[]
  crowdHacks: CrowdHack[]
  dayTrips?: DayTrip[]
  suggestedDays?: SuggestedDay[]
  foodNotes?: FoodNote[]
  photoWalks?: PhotoWalk[]
  photoInspo?: PhotoInspiration[]
  note: string
}

export type WardrobeCapsule = {
  id: string
  kicker: string
  title: string
  preview: string
  forHer: string
  forHim: string
  worksBestFor: string[]
  palette: string[]
}

export type BookingLink = {
  label: string
  url: string
}

const tokyoSunset: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1742608478429-44c7176b2289?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Пастельный закат над Токио с мягким силуэтом Фудзи на заднем плане.',
  creditLabel: 'Tokyo sunset / Antoine Pouligny',
  creditUrl:
    'https://unsplash.com/photos/city-skyline-with-a-beautiful-sunset-xvCT5l2hzi4',
}

const tokyoNight: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1663850598470-3ba63b6c381c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Ночной Токио с башней Tokyo Tower и холодным синим небом.',
  creditLabel: 'Tokyo after dark / Tokyo Kohaku',
  creditUrl:
    'https://unsplash.com/photos/a-city-skyline-at-night-Z7IrbGcMu4o',
}

const kyotoDawn: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1705923401054-b06daf310fc3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Улица в Киото с пагодой Yasaka на рассвете.',
  creditLabel: 'Kyoto sunrise / Filipe Freitas',
  creditUrl:
    'https://unsplash.com/photos/an-empty-street-with-a-pagoda-in-the-background-gIdyXL8VHEc',
}

const kyotoRain: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1573047330192-4e6bb1594325?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Вечерняя улица Киото после дождя с теплым светом фонарей.',
  creditLabel: 'Kyoto rain / Zion C',
  creditUrl: 'https://unsplash.com/photos/brown-and-gray-temple-Qiw63GpWN6w',
}

const osakaRiver: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1715943677003-0e5f7d59bc73?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Ночной канал в Осаке с неоном и отражениями в воде.',
  creditLabel: 'Osaka canal / Kevin Charit',
  creditUrl:
    'https://unsplash.com/photos/a-river-running-through-a-city-at-night-XvMeMsbcFGQ',
}

/* ── golden-hour reference shots ────────────────────────────── */

const tokyoTowerMorning: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1688324667406-581e2b45fa12?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Люди на траве в парке Сиба на фоне Токийской башни.',
  creditLabel: 'Shiba Park people / On Lee',
  creditUrl:
    'https://unsplash.com/photos/a-group-of-people-sitting-on-the-grass-in-front-of-a-tall-tower-ij22WUlwOn0',
}

const shibuyaSkySunset: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1718965102429-eadea742307f?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Люди на смотровой площадке Shibuya Sky на закате.',
  creditLabel: 'Shibuya Sky crowd / Joshua Tsu',
  creditUrl:
    'https://unsplash.com/photos/a-crowd-of-people-standing-on-top-of-a-tall-building-p-eHaNMWtHE',
}

const yasakaStreet: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1759087833216-9ee12b5f30ca?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Пара в юкатах на улице у пагоды Ясака, Киото.',
  creditLabel: 'Yasaka Pagoda couple / Rafik Wahba',
  creditUrl:
    'https://unsplash.com/photos/couple-in-traditional-japanese-yukata-walking-on-street-DN6jV7VORDM',
}

const shirakawaEvening: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1768162125653-8fb5db71dcbb?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Пара в вечернем переулке Гион, Киото.',
  creditLabel: 'Gion couple / Perry Merrity II',
  creditUrl:
    'https://unsplash.com/photos/couple-walking-down-a-dimly-lit-alley-at-night-yMgV1JUH-mo',
}

const osakaMorning: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1724133086198-bee4d63fd203?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Люди гуляют у замка Осака утром.',
  creditLabel: 'Osaka Castle people / Kiko K',
  creditUrl:
    'https://unsplash.com/photos/a-group-of-people-walking-around-a-large-building-FYvIR4OggJk',
}

const osakaNeon: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1584505489290-96eb4e406d08?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  alt: 'Dotonbori ночью с лодками, неоном и отражениями.',
  creditLabel: 'Osaka neon / Juliana Barquero',
  creditUrl:
    'https://unsplash.com/photos/boat-on-river-between-high-rise-buildings-during-nighttime-WaHPhFveWLk',
}

/* ── hotel photos ──────────────────────────────────────────── */

const hotelAoyama: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1746549855427-57e6da7040db?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Современный номер бутик-отеля с элегантной мебелью.',
  creditLabel: 'Boutique room / Unsplash',
  creditUrl: 'https://unsplash.com/photos/a-modern-hotel-room-with-elegant-furnishings-Qvn9nTldQgc',
}

const hotelSeiryu: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1752741030528-4472bfd660b3?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Коридор люксового отеля с видом на зелень.',
  creditLabel: 'Hotel corridor / Unsplash',
  creditUrl: 'https://unsplash.com/photos/a-hallway-leads-to-a-view-of-lush-greenery-lz6k8rhBJIk',
}

const hotelSowaka: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1754668122695-7b32062f339f?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Традиционная японская комната с татами и сёдзи.',
  creditLabel: 'Ryokan room / Unsplash',
  creditUrl: 'https://unsplash.com/photos/a-traditional-japanese-room-with-tatami-mats-and-shoji-screens-2WaUtK4lU5w',
}

const hotelShinmonzen: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1702014861736-d62834317c5e?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Номер отеля с большой кроватью и панорамным окном.',
  creditLabel: 'Luxury room / Unsplash',
  creditUrl: 'https://unsplash.com/photos/a-hotel-room-with-a-large-bed-and-a-window-qbhF5gOzhVU',
}

const hotelZentis: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1755613708939-d572099433ab?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Минималистичный номер с видом на город.',
  creditLabel: 'City view room / Unsplash',
  creditUrl: 'https://unsplash.com/photos/modern-hotel-room-with-city-view-through-window-pRAs34PRUuU',
}

const hotelTrunk: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1764445274404-f2e14fd3f20c?auto=format&fit=crop&fm=jpg&q=60&w=1200',
  alt: 'Традиционная японская комната с перегородками сёдзи и татами.',
  creditLabel: 'Japanese room / Unsplash',
  creditUrl: 'https://unsplash.com/photos/traditional-japanese-room-with-shoji-screens-and-tatami-mats-TeNtfZuCWe8',
}

export const whyNow = {
  eyebrow: 'ПОЧЕМУ СЕЙЧАС',
  title: 'Окно, которое скоро закроется',
  points: [
    {
      title: 'Курс иены на историческом минимуме',
      body: 'Поездка обходится вдвое дешевле, чем ещё восемь лет назад. Тот же отель, тот же ужин — но за другие деньги.',
    },
    {
      title: 'Tax-free прямо в магазине',
      body: 'До осени 2026 скидку дают на кассе. После — возврат на карту уже после вылета. Разница ощутима при любом шопинге.',
    },
    {
      title: 'Визу дают бесплатно и быстро',
      body: 'Простая подача, никаких сборов. Сколько это продлится — вопрос политики, а не логики.',
    },
    {
      title: 'Май — идеальное окно по погоде и толпам',
      body: 'Комфортные 20–25°C, свежая зелень, длинный световой день. Туристов заметно меньше, чем в сезон сакуры или осенних клёнов.',
    },
    {
      title: 'Ограничения на горизонте',
      body: 'Япония рассматривает лимиты на поток туристов и закрытие отдельных улиц для посетителей. Пока этого нет — можно увидеть страну без барьеров.',
    },
  ],
}

export const hero = {
  edition: 'curated edit / spring 2026',
  title: 'JAPAN ROMANTIC',
  route: 'Tokyo / Kyoto / Osaka',
  dek: 'Романтика, стиль, адреса на золотой час, Green Car, лучшие рестораны и тонкая логистика — чтобы поездка выглядела как ваша лучшая редакционная история.',
  note: 'В духе editorial city guide: меньше чеклистов, больше атмосферы, тайминга, одежды и мест, где свет красив.',
  version: 'Japan edit / v4',
  ctaLabel: 'Открыть маршрут',
  image: tokyoSunset,
  secondaryImage: kyotoRain,
}

export const tripFrame = {
  travelers: 'для Dmitrii & Viktoriia Vostriakov',
  flights: [
    { date: '09 May 2026', route: 'SVO > PVG' },
    { date: '10 May 2026', route: 'PVG > NRT 15:55' },
    { date: '19 May 2026', route: 'KIX 09:30 > PVG > SVO' },
  ],
  essentials: [
    { label: 'Маршрут', value: 'SVO > PVG > NRT / KIX > PVG > SVO' },
    { label: 'На месте', value: '9 ночей' },
    { label: 'Структура', value: 'Tokyo 4N / Kyoto 3N / Osaka 2N' },
    { label: 'Ж/д', value: 'только Nozomi Green Car' },
    { label: 'Плановый FX', value: '¥100 = ₽51.52' },
    { label: 'Билеты', value: '₽225 662 за двоих уже оплачено' },
  ],
}

export const versionNotes = {
  feel: 'Девять ночей, три города, одно настроение: неспешно, красиво, с правильным светом утром и хорошим столом вечером. Всё ниже собрано так, чтобы вы не думали о логистике — только о друг друге и о том, куда падает свет.',
  hotelPick:
    'Лучший общий сценарий по соотношению вкуса, комфорта и расходов: Aoyama Grand / Hotel Seiryu / Zentis Osaka. Сильнее по духу Киото — SOWAKA; сильнее по wow — The Shinmonzen. Но именно Tier A сейчас выглядит самым умным и самым вашим.',
}

export const hotelTiers: Array<
  TableRow & {
    tier: string
    stack: string
    mood: string
    subtotal: string
    bookingUrl?: string
    image?: ImageAsset
  }
> = [
  {
    id: 'tier-a',
    tier: 'A / лучший баланс',
    stack: 'Aoyama Grand 4N • Hotel Seiryu 3N • Zentis 2N',
    mood: 'самый сбалансированный: стильный Токио, фотогеничный Киото, спокойный финал в Осаке',
    subtotal: '¥765 348 / ₽394 274',
    bookingUrl: 'https://aoyamagrand.com',
    image: hotelAoyama,
  },
  {
    id: 'tier-b',
    tier: 'B / душевный Киото',
    stack: 'Aoyama Grand 4N • SOWAKA 3N • Zentis 2N',
    mood: 'больше характера старого Киото, выше расходы, сильнее романтика рёканов',
    subtotal: '¥1 144 389 / ₽589 539',
    bookingUrl: 'https://sowaka.com',
    image: hotelSowaka,
  },
  {
    id: 'tier-c',
    tier: 'C / wow-эффект',
    stack: 'Aoyama Grand 4N • The Shinmonzen 3N • Zentis 2N',
    mood: 'энергия модной недели, арт-мир Киото, максимальный wow',
    subtotal: '¥1 188 786–¥1 328 786 / ₽612 410–₽684 532',
    bookingUrl: 'https://theshinmonzen.com',
    image: hotelShinmonzen,
  },
  {
    id: 'tier-d',
    tier: 'D / умные расходы',
    stack: 'TRUNK 4N • Hotel Seiryu 3N • Zentis 2N',
    mood: 'вкус остаётся, расходы на отели заметно ниже',
    subtotal: '¥563 120 / ₽290 095',
    bookingUrl: 'https://www.princehotels.com',
    image: hotelTrunk,
  },
]

export const recommendedTier = {
  title: 'Tier A — Aoyama Grand / Hotel Seiryu / Zentis',
  why: 'Токио остаётся стильным и молодым, Киото даёт лучшие виды и драму света без ценника Shinmonzen, Осака держит финал спокойным и логистически чистым под KIX.',
  subtotal: 'Итого отели: ¥765 348 / ₽394 274',
  atmosphereNote:
    'Ставка по атмосфере: лучше один сильный вечер в Киото, чем равномерно переплатить везде.',
  bookingOrder: [
    'Киото первым. Самая капризная часть по наличию и по цене.',
    'Токио вторым. Больше хороших опций, но правильные номера уходят.',
    'Осака последней. Функциональный, но красивый финал.',
    'Попросить пометку об anniversary / romantic trip, высокий этаж, тихий номер, подальше от служебного лифта.',
  ],
  bookingLogic: [
    'Токио: не более одного серьёзного ужина. Джетлаг после перелёта реален.',
    'Киото: это город, где бронирования важнее всего.',
    'Осака: финальный вечер — лёгкий, без перегрузки.',
  ],
  optionalSplurges: [
    'Blue Bottle Studio Kyoto — ¥17 820 / ₽9 180 на двоих',
    'K36 через ужин в Benoit — от ¥16 000 / ₽8 242 на двоих без напитков',
    'The Top, если не живёте в Aoyama Grand — ¥2 000 / ₽1 030 вход на двоих',
  ],
}

export const budgetRows: Array<
  TableRow & {
    item: string
    jpy: string
    rub: string
    note: string
  }
> = [
  {
    id: 'budget-flights',
    item: 'Авиабилеты (уже оплачено)',
    jpy: '—',
    rub: '₽225 662',
    note: 'отдельно от land total',
  },
  {
    id: 'budget-hotels',
    item: 'Отели Tier A',
    jpy: '¥765 348',
    rub: '₽394 274',
    note: 'рекомендованный набор отелей',
  },
  {
    id: 'budget-green-car',
    item: 'Nozomi Green Car x2',
    jpy: '¥46 080',
    rub: '₽23 738',
    note: 'межгородские переезды',
  },
  {
    id: 'budget-transfer',
    item: 'Аэропортовые трансферы comfort',
    jpy: '¥11 800',
    rub: '₽6 079',
    note: 'запас на Narita / KIX',
  },
  {
    id: 'budget-dinners',
    item: 'Резервируемые ужины (3 якоря)',
    jpy: '¥104 600',
    rub: '₽53 885',
    note: 'Rossi + Gion Loka + UPSTAIRZ',
  },
  {
    id: 'budget-activities',
    item: 'Билеты / активности',
    jpy: '¥37 800',
    rub: '₽19 473',
    note: 'Shibuya Sky, teamLab, tea, cruise',
  },
  {
    id: 'budget-buffer',
    item: 'Буфер на casual food / coffee / local taxis',
    jpy: '¥120 000–¥180 000',
    rub: '₽61 819–₽92 728',
    note: 'реалистичный запас',
  },
  {
    id: 'budget-land-total',
    item: 'LAND TOTAL, TIER A',
    jpy: '¥965 628',
    rub: '₽497 449',
    note: 'без авиабилетов и дневного буфера',
  },
  {
    id: 'budget-land-buffer',
    item: 'LAND TOTAL + BUFFER',
    jpy: '¥1 085 628–¥1 145 628',
    rub: '₽559 268–₽590 177',
    note: 'общая поездка за двоих',
  },
  {
    id: 'budget-grand-total',
    item: 'FLIGHTS + LAND TOTAL',
    jpy: '—',
    rub: '₽784 930–₽815 839',
    note: 'оптимум по бюджету',
  },
]

export const cities: CityChapter[] = [
  {
    slug: 'tokyo',
    label: 'TOKYO',
    dateRange: '10–14 May 2026',
    theme: 'городской стиль / линия горизонта / первые четыре ночи',
    base: 'THE AOYAMA GRAND HOTEL',
    goldenHour: {
      am: '04:45–05:30',
      pm: '17:50–18:40',
    },
    image: tokyoNight,
    am: [
      {
        name: 'Aoyama / Omotesando backstreets',
        description:
          'чистые фасады, почти нет машин — лучшее место для парных прогулочных кадров и тихих editorial-фреймов',
      },
      {
        name: 'Marunouchi Station forecourt',
        description:
          'симметрия, красный кирпич, такси, полированный камень — выглядит дорого даже в простой одежде',
      },
      {
        name: 'Shiba Park + Tokyo Tower',
        description:
          'мягкие линии, спокойная зелень; лучший выбор, если хочется один знаковый городской кадр без суеты',
        image: tokyoTowerMorning,
      },
    ],
    pm: [
      {
        name: 'Shibuya Sky',
        description:
          'бронируйте слот за ~30 мин до заката; сильнейшие кадры с силуэтами на фоне неба',
        image: shibuyaSkySunset,
      },
      {
        name: 'The Top. at Aoyama Grand',
        description:
          'камернее, чем туристические площадки; гости отеля бесплатно, остальные — ¥1 000 с человека',
      },
      {
        name: 'Gaien / Omotesando blue hour',
        description:
          'аллеи деревьев, стеклянные отражения, энергия модной недели',
      },
    ],
    dining: [
      {
        name: 'Little Darling Coffee Roasters',
        description:
          'будни 08:00–20:00 / выходные 10:00–19:00; идеально после утренней прогулки',
      },
      {
        name: 'Rossi',
        description:
          'лучший ужин в первый вечер; примерно ¥28 600 / ₽14 733 на двоих',
      },
      {
        name: 'Tsukiji Outer Market',
        description:
          'приходите после 09:00 для спокойного темпа; ешьте у прилавка, не перегораживайте рабочие проходы',
      },
      {
        name: 'Starbucks Reserve Roastery',
        description:
          'план на дождливый день: кофе + интерьеры, а не точка для утренних фото',
      },
    ],
    sightseeing: [
      {
        label: 'Храмы и святилища',
        spots: [
          { name: 'Meiji Jingū', description: 'главное синтоистское святилище Токио — лесная тишина посреди мегаполиса', station: 'Meiji-jingūmae' },
          { name: 'Sensō-ji', description: 'древнейший храм города; утром до 08:00 — без толпы, красные фонари и дым благовоний', station: 'Asakusa' },
          { name: 'Nezu Shrine', description: 'тысячи тории как в Fushimi, но без туристов; в мае цветут азалии', station: 'Nezu' },
        ],
      },
      {
        label: 'Парки и сады',
        spots: [
          { name: 'Shinjuku Gyoen', description: 'лучший парк для парных фото — три стиля сада: японский, английский, французский', station: 'Shinjuku-gyoenmae' },
          { name: 'Hamarikyu Gardens', description: 'сад на воде у Токийского залива; чайный домик на пруду, небоскрёбы за деревьями', station: 'Shiodome' },
        ],
      },
      {
        label: 'Районы для прогулок',
        spots: [
          { name: 'Daikanyama / Nakameguro', description: 'кофейни, винтажные бутики, канал; самый стильный район для неспешной прогулки', station: 'Daikanyama' },
          { name: 'Yanaka', description: 'старый Токио: деревянные дома, коты, храмы, ремесленные лавки', station: 'Nippori' },
          { name: 'Shimokitazawa', description: 'андеграунд-район: винтаж, пластинки, крафтовые бары и маленькие театры', station: 'Shimokitazawa' },
        ],
      },
      {
        label: 'Виды и смотровые',
        spots: [
          { name: 'Shibuya Sky', description: 'открытая площадка на 230 м — лучший панорамный закат в городе', station: 'Shibuya' },
          { name: 'Tokyo Skytree', description: '634 м — самая высокая башня; утренние слоты самые спокойные', station: 'Oshiage' },
          { name: 'Mori Art Museum', description: 'смотровая + современное искусство; Roppongi Hills, 52-й этаж', station: 'Roppongi' },
        ],
      },
      {
        label: 'Шопинг и рынки',
        spots: [
          { name: 'Tsukiji Outer Market', description: 'уличная еда и свежайшие морепродукты; приходите после 09:00', station: 'Tsukiji' },
          { name: 'Ginza', description: 'люксовый шопинг: GINZA SIX, Dover Street Market, Muji flagship', station: 'Ginza' },
          { name: 'Omotesando', description: 'архитектурная авеню моды: Tadao Ando, SANAA, Kengo Kuma', station: 'Omotesandō' },
        ],
      },
      {
        label: 'Музеи и культура',
        spots: [
          { name: 'teamLab Borderless', description: 'иммерсивное digital-искусство; билеты по дате, бронь за 2 недели', station: 'Azabu-jūban' },
          { name: 'Nezu Museum', description: 'азиатское искусство + японский сад; идеально для позднего утра', station: 'Omotesandō' },
        ],
      },
    ],
    mustSee: [
      { name: 'Shibuya Sky на закате', why: 'панорама всего Токио с открытой крыши на 230 м — один из сильнейших городских видов в мире' },
      { name: 'Meiji Jingū утром', why: 'лес посреди мегаполиса; тории, гравий, тишина — перезагрузка после перелёта' },
      { name: 'teamLab Borderless', why: 'иммерсивное искусство, которое нигде больше не повторяется; парные фото здесь — магия' },
      { name: 'Tsukiji Outer Market', why: 'не туристическая ловушка, а реальная еда: тамагояки, уни, тунец — настоящий вкус Токио' },
      { name: 'Omotesando на рассвете', why: 'архитектура мировых звёзд без единого человека; лучшие editorial-кадры поездки' },
    ],
    crowdHacks: [
      { tip: 'Sensō-ji: приходите до 06:30 — храм открыт, а туристы ещё спят; после 09:00 — толпа и очередь на фото' },
      { tip: 'Shibuya Sky: берите слот за 30 мин до заката, не на закат — меньше людей и лучший свет для фото' },
      { tip: 'teamLab: бронируйте утренний слот (10:00–11:00) и в будний день; вечера — самые загруженные' },
      { tip: 'Harajuku / Takeshita: избегайте выходных полностью; в будни после 17:00 — терпимо' },
      { tip: 'Shinjuku Gyoen: входите через ворота Ōkido (南門) — меньше очередь, чем у главного входа' },
      { tip: 'Tsukiji: приходите к 09:30–10:00 — первая волна туристов уже ушла, еда свежая, прилавки свободны' },
    ],
    suggestedDays: [
      {
        label: 'День 1',
        theme: 'Прилёт и мягкая адаптация',
        flow: [
          '15:55 — прилёт в Нариту, трансфер в отель',
          '18:00 — заселение, душ, переодеться',
          '19:00 — лёгкая прогулка по Aoyama backstreets',
          '20:00 — ужин в Rossi (если есть силы) или room service',
        ],
      },
      {
        label: 'День 2',
        theme: 'Храмы, парки, первые кадры',
        flow: [
          '06:30 — Meiji Jingū на рассвете, лес и тории',
          '09:00 — завтрак в Little Darling Coffee Roasters',
          '10:30 — Harajuku / Omotesando — архитектура и витрины',
          '13:00 — обед в Shibuya',
          '14:30 — Shinjuku Gyoen — японский сад, парные фото',
          '17:30 — Shibuya Sky на закат',
          '20:00 — свободный вечер, Gaien blue hour',
        ],
      },
      {
        label: 'День 3',
        theme: 'Искусство и рынок',
        flow: [
          '09:00 — Tsukiji Outer Market — завтрак у прилавков',
          '11:00 — teamLab Planets (утренний слот)',
          '14:00 — Daikanyama / Nakameguro — кофейни и канал',
          '16:00 — Nezu Museum + сад',
          '19:00 — свободный вечер или The Top at Aoyama Grand',
        ],
      },
      {
        label: 'День 4',
        theme: 'Шопинг и переезд в Киото',
        flow: [
          '08:00 — Marunouchi Station — утренние editorial-кадры',
          '10:00 — Ginza — GINZA SIX, Dover Street Market',
          '12:30 — обед в Ginza',
          '14:00 — багаж отправлен TA-Q-BIN, Green Car до Киото',
          '17:00 — заселение в Киото',
          '18:30 — первая прогулка по Gion, ужин в Pontocho',
        ],
      },
    ],
    photoWalks: [
      {
        title: 'Omotesando — архитектурная линия',
        duration: '1.5–2 ч',
        bestTime: 'рассвет, 05:00–06:30',
        stops: [
          { spot: 'Omotesando Hills (Tadao Ando)', tip: 'бетон + утренние тени — лучший editorial-фон поездки; снимайте с противоположной стороны улицы' },
          { spot: 'Dior Ginza-style facade', tip: 'стеклянные отражения работают только при мягком боковом свете — не позже 06:00' },
          { spot: 'Nezu Museum стена', tip: 'бамбуковый забор + каменная дорожка — 10 метров идеальной тишины для парного кадра' },
          { spot: 'Cat Street', tip: 'узкая улочка с винтажными фасадами; красиво пуста на рассвете, днём — толпа' },
        ],
      },
      {
        title: 'Marunouchi — станция и небоскрёбы',
        duration: '1–1.5 ч',
        bestTime: 'раннее утро или синий час, 17:30–18:30',
        stops: [
          { spot: 'Tokyo Station фасад', tip: 'красный кирпич, симметрия, такси — встаньте по центру на зебре, когда пусто' },
          { spot: 'KITTE Garden (крыша)', tip: 'вид сверху на станцию и площадь; бесплатный вход, мало людей' },
          { spot: 'Marunouchi Naka-dori', tip: 'аллея с деревьями между стеклянных башен — европейское ощущение, хорошие силуэтные кадры' },
          { spot: 'Imperial Palace moat', tip: 'каменные стены + вода + зелень; утром тихо и графично' },
        ],
      },
      {
        title: 'Yanaka — старый Токио',
        duration: '2–2.5 ч',
        bestTime: 'позднее утро, 09:00–11:30',
        stops: [
          { spot: 'Yanaka Ginza', tip: 'торговая улочка с ретро-фасадами; коты на крышах — не постановка, реальность' },
          { spot: 'Yanaka Cemetery', tip: 'не мрачно — аллея деревьев, тишина, свет сквозь листву; в мае — яркая зелень' },
          { spot: 'Храмы переулков', tip: 'десятки маленьких храмов между деревянных домов; каждый поворот — новый кадр' },
          { spot: 'SCAI The Bathhouse', tip: 'галерея в бывшей бане 200-летней давности — минимализм и текстура' },
        ],
      },
    ],
    photoInspo: [
      {
        title: 'Street photo',
        mood: 'контрасты мегаполиса — бетон, стекло, толпа, одиночество',
        spots: [
          { location: 'Shibuya Crossing', idea: 'длинная выдержка сверху (Shibuya Sky или Starbucks 2F) — потоки людей как река; или снизу — один зонт среди сотен' },
          { location: 'Shinjuku Kabukicho', idea: 'неоновые переулки, силуэты, дождь на асфальте — Blade Runner наяву; лучше после 22:00' },
          { location: 'Shimokitazawa переулки', idea: 'винтажные вывески, велосипеды, кошки на подоконниках — тихий андеграунд без пафоса' },
          { location: 'Akihabara', idea: 'вертикальные вывески, провода, мерцающие экраны — максимальная визуальная перегрузка; хорошо в дождь' },
          { location: 'Tsukiji у прилавков', idea: 'руки, рыба, пар, ножи — честная документалка; снимайте не людей, а жесты и текстуры' },
        ],
      },
      {
        title: 'Fashion / editorial',
        mood: 'чистые линии, архитектура как фон, минимум отвлекающих деталей',
        spots: [
          { location: 'Omotesando на рассвете', idea: 'пустая архитектурная авеню — бетон Tadao Ando, стекло Dior, тени на тротуаре; идеальный editorial backdrop' },
          { location: 'Tokyo Station фасад', idea: 'красный кирпич + симметрия; full-length в центре площади, когда пусто — европейский glamour' },
          { location: 'Daikanyama T-Site', idea: 'белые стены книжного + зелень; расслабленный luxury, кофе в кадре, естественный свет' },
          { location: 'Meiji Jingū torii', idea: 'гигантские тории + гравийная дорожка — масштаб человека на фоне; утром без толпы' },
          { location: 'Aoyama backstreets', idea: 'чистые фасады, минималистичные витрины, почти нет машин — идеально для lookbook-серии' },
          { location: 'Rainbow Bridge / Odaiba', idea: 'мост + залив + силуэт города; вечерний контровой свет, ветер в волосах' },
        ],
      },
    ],
    note: 'Лучшие токийские кадры — скорее editorial, чем исторические. Рассвет — для тихих улиц, не для музеев. Nezu — план на позднее утро с мягким светом, не на рассвет.',
  },
  {
    slug: 'kyoto',
    label: 'KYOTO',
    dateRange: '14–17 May 2026',
    theme: 'эмоциональный центр поездки / лучший свет / старый камень',
    base: 'THE HOTEL SEIRYU or SOWAKA',
    goldenHour: {
      am: '05:00–05:45',
      pm: '18:10–18:55',
    },
    image: kyotoDawn,
    am: [
      {
        name: 'Yasaka Pagoda / Yasaka-dori',
        description:
          'сильнейший рассветный кадр всей поездки; будьте на месте до 06:00',
        image: yasakaStreet,
      },
      {
        name: 'Ninenzaka / Sannenzaka',
        description:
          'каменные переулки, фонари, почти пусто, если прийти достаточно рано',
      },
      {
        name: 'Arashiyama Bamboo Grove',
        description:
          'имеет смысл только рано утром; после завтрака превращается в борьбу с толпой',
      },
    ],
    pm: [
      {
        name: 'Shirakawa canal bridge',
        description:
          'самый романтичный кадр Киото в синий час; медленнее, мягче и кинематографичнее, чем туристические точки',
        image: shirakawaEvening,
      },
      {
        name: 'K36 rooftop',
        description:
          'лучший закатный вид в Киото; smart casual, зависит от погоды — стоит строить вечер вокруг',
      },
      {
        name: 'Kamo river / Pontocho edge',
        description:
          'хорошо для кадров в движении, силуэтов и мягкого послеужинного настроения',
      },
    ],
    dining: [
      {
        name: 'Camellia private tea',
        description:
          'забронируйте приватную чайную церемонию на двоих, примерно ¥16 000 / ₽8 242',
      },
      {
        name: 'Gion Loka',
        description:
          'якорный ужин Киото; примерно ¥48 000 / ₽24 727 на двоих',
      },
      {
        name: '% Arabica Higashiyama',
        description:
          'отличная кофейная остановка между утренними фото-улочками и поздним завтраком',
      },
      {
        name: 'Jean-Georges at The Shinmonzen',
        description:
          'альтернатива для ценителей; примерно ¥53 000 / ₽27 303 на двоих',
      },
      {
        name: 'Blue Bottle Studio Kyoto',
        description:
          'кофейный курс только по брони, весна 2026 активна; примерно ¥17 820 / ₽9 180 на двоих',
      },
      {
        name: 'Nishiki Market',
        description:
          'отличный обед на ходу, но не ешьте на ходу — японский этикет',
      },
    ],
    sightseeing: [
      {
        label: 'Храмы и святилища',
        spots: [
          { name: 'Fushimi Inari Taisha', description: 'тысячи красных тории вверх по горе; идите рано утром — к 08:00 уже толпы', station: 'Inari (JR)' },
          { name: 'Kinkaku-ji', description: 'Золотой павильон на воде; классика, которую стоит увидеть хотя бы раз', station: 'автобус 101/205' },
          { name: 'Kiyomizu-dera', description: 'храм на склоне с деревянной террасой; панорама города и закат', station: 'Kiyomizu-gojō' },
          { name: 'Ryōan-ji', description: 'сад камней — 15 камней, из которых видно только 14; медитативная тишина', station: 'автобус 59' },
        ],
      },
      {
        label: 'Парки и сады',
        spots: [
          { name: 'Arashiyama Bamboo Grove', description: 'бамбуковая роща — магия только до 07:00, потом туристический конвейер', station: 'Saga-Arashiyama' },
          { name: 'Philosopher\'s Path', description: '2 км вдоль канала: храмы, кафе, кошки; лучшее позднее утро Киото', station: 'Keage' },
          { name: 'Maruyama Park', description: 'главный парк Гиона; плакучая сакура, пруд, переход к Yasaka Shrine', station: 'Gion-Shijō' },
        ],
      },
      {
        label: 'Районы для прогулок',
        spots: [
          { name: 'Gion', description: 'чайные дома, мачия, гейши; Hanamikōji-dōri — главная улица, но боковые переулки интереснее', station: 'Gion-Shijō' },
          { name: 'Higashiyama', description: 'от Kiyomizu до Yasaka — пешеходный маршрут через старый Киото: керамика, веера, моти', station: 'Kiyomizu-gojō' },
          { name: 'Nishijin', description: 'район ткачей — кимоно-мастерские, мачия, почти без туристов', station: 'Imadegawa' },
        ],
      },
      {
        label: 'Виды и смотровые',
        spots: [
          { name: 'K36 The Bar & Rooftop', description: 'лучший закатный вид в Киото; коктейли на крыше с панорамой храмов', station: 'Gion-Shijō' },
          { name: 'Shogunzuka Seiryuden', description: 'смотровая терраса выше Kiyomizu; панорама всего Киото без толп', station: 'Keage + 20 мин пешком' },
        ],
      },
      {
        label: 'Шопинг и рынки',
        spots: [
          { name: 'Nishiki Market', description: '400 м крытого рынка — цукемоно, юба, маття-десерты; обед на ходу', station: 'Karasuma' },
          { name: 'Teramachi & Shinkyogoku', description: 'крытые торговые аркады с mix японских сувениров и craft-магазинов', station: 'Kawaramachi' },
        ],
      },
      {
        label: 'Музеи и культура',
        spots: [
          { name: 'Kyoto National Museum', description: 'главная коллекция: буддийская скульптура, свитки, керамика', station: 'Shichijō' },
          { name: 'HOSOO GALLERY', description: 'современное текстильное искусство в 300-летней ткацкой мастерской', station: 'Karasuma Oike' },
          { name: 'Camellia Tea Ceremony', description: 'приватная чайная церемония для двоих — интимно, не для инстаграма', station: 'Gion-Shijō' },
        ],
      },
    ],
    mustSee: [
      { name: 'Fushimi Inari на рассвете', why: 'тысячи красных тории уходят в гору — без людей это ощущается как другое измерение' },
      { name: 'Yasaka Pagoda / Ninenzaka', why: 'каменные переулки старого Киото — самый фотогеничный район всей Японии' },
      { name: 'Kinkaku-ji', why: 'Золотой павильон на воде — одна из тех вещей, которые в реальности красивее, чем на фото' },
      { name: 'Бамбуковая роща Арасияма', why: 'ощущение, что вы внутри картины Хокусая; звук ветра в бамбуке не забывается' },
      { name: 'Чайная церемония на двоих', why: 'не аттракцион, а настоящий ритуал замедления; после неё вы по-другому смотрите друг на друга' },
    ],
    crowdHacks: [
      { tip: 'Fushimi Inari: будьте у первых тории к 05:30 — к 07:00 уже появляются первые группы; идите дальше первой развилки — 80% туристов разворачиваются' },
      { tip: 'Бамбуковая роща: только до 07:00 имеет смысл; после — конвейер селфи-палок. Альтернатива: Sagano bamboo trail за рощей' },
      { tip: 'Kiyomizu-dera: утренний вход (06:00) — пусто; или приходите за 40 мин до закрытия, когда толпа уходит' },
      { tip: 'Gion: не ходите по Hanamikōji после 11:00 — только туристы и такси. Переулки Shinbashi и Shirakawa — тише и красивее' },
      { tip: 'Nishiki Market: будни 10:00–11:00 — лучшее окно; после обеда и в выходные — плечо к плечу' },
      { tip: 'Philosopher\'s Path: идите с северного конца (Ginkaku-ji) — большинство начинает с юга, так вы идёте против потока' },
    ],
    dayTrips: [
      {
        destination: 'Нара',
        duration: '40 мин на поезде от Киото',
        highlights: [
          { name: 'Парк оленей', description: 'более 1200 оленей свободно гуляют по парку и кланяются за печенье «сика-сэмбэй» — трогательный и забавный ритуал' },
          { name: 'Тодай-дзи', description: 'крупнейшее деревянное здание в мире; внутри — бронзовый Будда высотой 16 метров, созданный в VIII веке' },
          { name: 'Моти в старинной мотишной', description: 'ручная работа при вас — мягкие рисовые пирожные с начинкой из фасоли, маття или клубники' },
          { name: 'Fushimi Inari (на обратном пути)', description: 'тысячи красных тории вверх по горе — совмещается с возвращением в Киото через станцию Inari' },
        ],
      },
    ],
    suggestedDays: [
      {
        label: 'День 1',
        theme: 'Рассвет, старый Киото и главный ужин',
        flow: [
          '05:30 — Fushimi Inari на рассвете (до первых групп)',
          '08:00 — завтрак, % Arabica Higashiyama',
          '09:30 — Yasaka Pagoda / Ninenzaka / Sannenzaka',
          '12:00 — Nishiki Market — обед на ходу',
          '14:00 — Camellia — приватная чайная церемония',
          '17:00 — Shirakawa canal в синий час',
          '19:00 — ужин в Gion Loka',
        ],
      },
      {
        label: 'День 2',
        theme: 'Арасияма — бамбук, обезьяны, река',
        flow: [
          '06:00 — Бамбуковая роща Сагано (только до 07:00)',
          '08:30 — завтрак в Арасияме',
          '10:00 — Парк обезьян Иватаяма — 100+ макак на горе, виды на весь Киото',
          '12:00 — Лодка по реке Кацура — лодочник с шестом, зелёные берега',
          '14:00 — лавки и ремесленные магазины Арасиямы',
          '17:00 — K36 rooftop на закат',
          '19:30 — свободный вечер, Pontocho или Kamo river',
        ],
      },
      {
        label: 'День 3',
        theme: 'Нара или свободный день',
        flow: [
          '08:00 — поезд до Нары (40 мин)',
          '09:00 — парк оленей и храм Тодай-дзи',
          '11:30 — моти на торговой улочке',
          '13:00 — Fushimi Inari (по пути обратно)',
          '16:00 — возвращение в Киото, сборы',
          '17:30 — багаж отправлен TA-Q-BIN в Осаку',
          '18:30 — Philosopher\'s Path или Kinkaku-ji, если не были',
        ],
      },
    ],
    foodNotes: [
      {
        title: 'Вагю — почему это стоит попробовать именно здесь',
        body: 'Настоящее вагю класса A5 — это мясо с мраморностью, которая видна невооружённым глазом: жировые прожилки пронизывают каждый срез как кружево. При комнатной температуре жир начинает таять на пальцах. Вкус — насыщенный, сливочный, с ореховым послевкусием, текстура не требует усилий при жевании. В Японии стейк в хорошем ресторане обойдётся в ¥5 000–10 000 — вдвое дешевле, чем в Москве, и с гарантией подлинности.',
        priceHint: 'стейк ¥5 000–10 000 / ₽2 500–5 000',
      },
      {
        title: 'Чайная церемония — не аттракцион, а замедление',
        body: 'Матчу взбивают бамбуковым венчиком ровно 40 раз — это создаёт идеальную пенку. Вы сидите на татами, перед вами — сёдзи и японский сад. Каждое движение имеет значение. К чаю подают вагаси — сезонные конфеты в форме весенних цветов. После церемонии меняется восприятие времени.',
      },
    ],
    photoWalks: [
      {
        title: 'Higashiyama — от Kiyomizu до Yasaka',
        duration: '2–3 ч',
        bestTime: 'рассвет, 05:30–07:00',
        stops: [
          { spot: 'Yasaka Pagoda / Yasaka-dori', tip: 'сильнейший рассветный кадр всей поездки — пагода в конце каменной улочки; будьте на месте до 06:00' },
          { spot: 'Ninenzaka', tip: 'каменные ступени, фонари, деревянные фасады; пуста только до 07:00, после — конвейер' },
          { spot: 'Sannenzaka', tip: 'продолжение Ninenzaka вверх; красиво в кимоно, если арендовали накануне' },
          { spot: 'Kodai-ji ворота', tip: 'резные ворота + бамбук — 30 секунд тишины для кадра, даже когда вокруг люди' },
          { spot: 'Ishibei-koji', tip: 'самый фотогеничный переулок Киото — каменные стены, мох, бумажные фонари; уважайте знак «без фото» у частных домов' },
        ],
      },
      {
        title: 'Gion — вечерняя прогулка',
        duration: '1.5–2 ч',
        bestTime: 'синий час → вечер, 18:00–20:00',
        stops: [
          { spot: 'Shirakawa canal bridge', tip: 'самый романтичный кадр Киото — ива, фонари, отражения в воде; приходите за 20 мин до синего часа' },
          { spot: 'Shinbashi-dori', tip: 'параллельная улочка тише Hanamikoji — чайные дома, мачия, тёплый свет' },
          { spot: 'Hanamikoji-dori', tip: 'главная улица Гион; не загораживайте вход в чайные дома, не фотографируйте гейш без разрешения' },
          { spot: 'Tatsumi Bridge', tip: 'маленький мост с ивой — классический открыточный ракурс; лучше с длинной выдержкой' },
        ],
      },
      {
        title: 'Arashiyama — бамбук и река',
        duration: '2.5–3 ч',
        bestTime: 'раннее утро, 06:00–08:30',
        stops: [
          { spot: 'Бамбуковая роща Сагано', tip: 'магия только до 07:00 — стволы уходят вверх на десятки метров, свет пробивается нитями; после 08:00 — толпа' },
          { spot: 'Sagano bamboo trail', tip: 'продолжение за основной рощей — тише, глубже, почти без людей' },
          { spot: 'Togetsukyo Bridge', tip: 'мост + горы + река — панорамный кадр Арасиямы; красиво с лодкой в кадре' },
          { spot: 'Tenryu-ji сад', tip: 'дзен-сад XIV века с прудом и горами на заднем плане; вход с 08:30, первые 20 мин — пусто' },
        ],
      },
    ],
    photoInspo: [
      {
        title: 'Street photo',
        mood: 'старый камень, дерево, ритуал, тишина',
        spots: [
          { location: 'Fushimi Inari тории', idea: 'бесконечный тоннель красных ворот — перспектива, повторение, одинокая фигура вдали; снимайте на рассвете' },
          { location: 'Pontocho переулок', idea: 'узкая улочка шириной в два шага — бумажные фонари, деревянные фасады, тень гейши за дверью' },
          { location: 'Nishiki Market', idea: 'цвет, текстура, еда крупным планом — маринованные овощи, рыба, моти; руки продавцов' },
          { location: 'Philosopher\'s Path', idea: 'канал, мост, кошка на камне — дзен-минимализм; медленная серия, один объект на кадр' },
          { location: 'Kiyomizu-dera терраса', idea: 'панорама Киото с деревянной террасы — город в дымке, крыши храмов, зелень; на закрытии — без людей' },
        ],
      },
      {
        title: 'Fashion / editorial',
        mood: 'кимоно, камень, свет сквозь бамбук, старое дерево',
        spots: [
          { location: 'Yasaka Pagoda / Yasaka-dori', idea: 'пагода в конце каменной улочки — идеальная глубина кадра; кимоно + утренний свет = обложка' },
          { location: 'Ishibei-koji', idea: 'каменные стены и мох — приглушённый, текстурный фон; хорошо для close-up и деталей одежды' },
          { location: 'Бамбуковая роща', idea: 'вертикальные линии бамбука + мягкий рассеянный свет — природный софтбокс; снимайте в профиль' },
          { location: 'Shirakawa canal', idea: 'ива + мост + вода — романтический кадр в синий час; пара в координированных образах' },
          { location: 'Kodai-ji сад', idea: 'сухой сад камней + чистое пространство — минималистичный фон для сильного образа' },
          { location: 'Nishijin weaving district', idea: 'кимоно-мастерские, текстильные текстуры на стенах — fashion meets craft; почти без туристов' },
        ],
      },
    ],
    note: 'Киото — место, где поездка становится по-настоящему эмоциональной. Рассвет здесь важнее, чем где-либо. И ещё: уважайте знаки «без фото» / «вход запрещён» на частных улочках Гион.',
  },
  {
    slug: 'osaka',
    label: 'OSAKA',
    dateRange: '17–19 May 2026',
    theme: 'финальный акт / еда / удобный выезд через KIX',
    base: 'ZENTIS OSAKA',
    goldenHour: {
      am: '05:00–05:40',
      pm: '18:10–18:55',
    },
    image: osakaRiver,
    am: [
      {
        name: 'Nakanoshima Rose Garden',
        description:
          'река + мосты + зелень; самый мягкий утренний кадр Осаки',
        image: osakaMorning,
      },
      {
        name: 'Kitahama riverfront',
        description:
          'тихая архитектура и мосты; острее и дизайнерски интереснее, чем замковые клише',
      },
      {
        name: 'Osaka Castle outer moat',
        description:
          'строгие линии и вода с отражениями — если хочется один классический городской кадр',
      },
    ],
    pm: [
      {
        name: 'Umeda Sky',
        description:
          'самый быстрый эффектный закатный кадр; лёгкая победа перед ужином',
      },
      {
        name: 'Nakanoshima River Cruise',
        description:
          'мягкий романтический финал; лучше как настроение, чем как осмотр достопримечательностей',
        image: osakaRiver,
      },
      {
        name: 'Tombori Riverwalk / Dotonbori',
        description:
          'используйте после синего часа — для неона и движения, не для нежной романтики',
        image: osakaNeon,
      },
    ],
    dining: [
      {
        name: 'Brooklyn Roasting Company Kitahama',
        description:
          'самая красивая кофейня, если делаете утреннюю прогулку по реке и мостам',
      },
      {
        name: 'UPSTAIRZ',
        description:
          'лучший ужин в последний вечер; примерно ¥30 000 / ₽15 455 на двоих',
      },
      {
        name: 'Kuromon Market',
        description:
          'хороший финальный гастро-маршрут; выбирайте, а не объедайтесь — так фотогеничнее',
      },
    ],
    sightseeing: [
      {
        label: 'Храмы и замки',
        spots: [
          { name: 'Osaka Castle', description: 'главный замок города; снаружи красивее, чем внутри — обходите по внешнему рву утром', station: 'Tanimachi 4-chōme' },
          { name: 'Shitennō-ji', description: 'старейший буддийский храм Японии (593 г.); тихий, без толп', station: 'Shitennōji-mae Yūhigaoka' },
          { name: 'Sumiyoshi Taisha', description: 'святилище с арочными мостами и архитектурой до-китайского стиля', station: 'Sumiyoshi Taisha (Nankai)' },
          { name: 'Katsuo-ji', description: 'загородный храм тысячи дарум — красные фигурки-прародители матрёшки покрывают всё пространство; загадайте желание и закрасьте глаз', station: 'автобус от Senri-Chūō' },
        ],
      },
      {
        label: 'Парки и сады',
        spots: [
          { name: 'Nakanoshima Park', description: 'розарий между двух рек; мосты, фонтаны, вечерняя подсветка', station: 'Naniwabashi' },
          { name: 'Minoo Park', description: '30 мин от центра — водопад, обезьяны, момидзи-темпура; хороший побег на полдня', station: 'Minoo (Hankyū)' },
        ],
      },
      {
        label: 'Районы для прогулок',
        spots: [
          { name: 'Dotonbori / Namba', description: 'неон, стрит-фуд, энергия — лучше вечером; гигантские вывески и канал', station: 'Namba' },
          { name: 'Shinsekai', description: 'ретро-район с башней Tsūtenkaku; кушикацу, пиво, ностальгическая атмосфера', station: 'Ebisucho' },
          { name: 'Amerikamura', description: 'молодёжный район: винтаж, стрит-арт, крафтовые кафе', station: 'Shinsaibashi' },
        ],
      },
      {
        label: 'Виды и смотровые',
        spots: [
          { name: 'Umeda Sky Building', description: 'футуристическая смотровая с эскалатором в небо; лучший закат Осаки', station: 'Umeda' },
          { name: 'Abeno Harukas 300', description: 'самый высокий небоскрёб Осаки — 300 м, панорама до Кобе и Нары', station: 'Tennōji' },
        ],
      },
      {
        label: 'Шопинг и рынки',
        spots: [
          { name: 'Kuromon Market', description: '«кухня Осаки» — морепродукты, фрукты, вагю; финальный гастро-маршрут', station: 'Nipponbashi' },
          { name: 'Shinsaibashi-suji', description: 'крытая торговая улица на 600 м — от люкса до масс-маркета', station: 'Shinsaibashi' },
        ],
      },
      {
        label: 'Музеи и культура',
        spots: [
          { name: 'Nakanoshima Museum of Art', description: 'новый музей (2022) — современное искусство в чёрном кубе над водой', station: 'Watanabebashi' },
          { name: 'Osaka Aquarium Kaiyukan', description: 'один из крупнейших аквариумов мира; китовая акула, медузы, тихоокеанский зал', station: 'Osakakō' },
        ],
      },
    ],
    mustSee: [
      { name: 'Dotonbori ночью', why: 'неон, гигантские вывески, лодки на канале — энергия, которой нет ни в одном другом городе Японии' },
      { name: 'Umeda Sky Building на закате', why: 'футуристический эскалатор в небо + панорама до горизонта; быстрый wow без подготовки' },
      { name: 'Osaka Castle утром', why: 'каменные стены, ров с водой, отражения — один классический кадр, который обязан быть в поездке' },
      { name: 'Kuromon Market', why: '«кухня Осаки»: вагю на гриле, уни, фрукты — лучший способ попрощаться с Японией через еду' },
    ],
    crowdHacks: [
      { tip: 'Dotonbori: лучшие кадры — в 22:00–23:00, когда семьи уходят и остаётся только неон и местные; днём — хаос' },
      { tip: 'Osaka Castle: обходите по внешнему рву с юга (Ōtemae) до 08:00 — ни одного туриста, идеальные отражения' },
      { tip: 'Umeda Sky: за 20 мин до заката, не в выходные; в выходные вечером — очередь на эскалатор' },
      { tip: 'Kuromon Market: приходите к 09:00 в будний день — прилавки уже открыты, но первая волна ещё не пришла' },
      { tip: 'Shinsekai: избегайте пятницы и субботы вечером — район маленький и переполняется; среда–четверг идеально' },
    ],
    suggestedDays: [
      {
        label: 'День 1',
        theme: 'Дотонбори, стрит-фуд и закат',
        flow: [
          '10:00 — заселение, разведка района',
          '11:30 — Kuromon Market — морепродукты, фрукты, вагю на гриле',
          '14:00 — Shinsekai — ретро-район, кушикацу, башня Tsūtenkaku',
          '16:30 — Umeda Sky Building на закат',
          '19:00 — Dotonbori — такояки, окономияки, неон и канал',
          '20:30 — ужин в UPSTAIRZ',
        ],
      },
      {
        label: 'День 2',
        theme: 'Утренний замок и вылет',
        flow: [
          '06:30 — Osaka Castle — внешний ров с юга, отражения без туристов',
          '08:30 — завтрак в Brooklyn Roasting Company',
          '10:00 — Nakanoshima Park или Kaiyukan (если есть время)',
          '12:00 — сборы, чекаут',
          '14:00 — трансфер в KIX (вылет на следующее утро) или свободный вечер',
        ],
      },
    ],
    foodNotes: [
      {
        title: 'Такояки и окономияки — ритуал Дотонбори',
        body: 'Такояки — хрустящие шарики с осьминогом, политые соусом и посыпанные бонито. Окономияки — толстый блин с капустой, мясом и морепродуктами, который готовят на тэппане при вас. Осака называет себя «кухней Японии», и Дотонбори — её главная витрина. Ешьте стоя у прилавка, не на ходу — это японский этикет.',
      },
      {
        title: 'Гигантские онигири',
        body: 'В Осаке есть кафе, где подают онигири размером с ладонь взрослого человека — с лососем, тунцом или маринованной сливой умэбоши. Хрустящие нори, тёплый рис и простой, но запоминающийся вкус. Хороший лёгкий обед между прогулками.',
      },
    ],
    photoWalks: [
      {
        title: 'Nakanoshima — утренняя река',
        duration: '1–1.5 ч',
        bestTime: 'рассвет → утро, 05:30–07:30',
        stops: [
          { spot: 'Nakanoshima Rose Garden', tip: 'река + мосты + розы — самый мягкий утренний кадр Осаки; работает даже в пасмурную погоду' },
          { spot: 'Kitahama riverfront', tip: 'каменные набережные и мосты в европейском стиле — острее и дизайнерски интереснее замковых клише' },
          { spot: 'Nakanoshima Museum of Art', tip: 'чёрный куб над водой — графичный и современный; хорошо с отражениями в луже после дождя' },
          { spot: 'Higobashi Bridge', tip: 'арочный мост + утренний свет на воде; силуэтные кадры в контровом свете' },
        ],
      },
      {
        title: 'Dotonbori — неон и энергия',
        duration: '1.5–2 ч',
        bestTime: 'вечер, 21:00–23:00',
        stops: [
          { spot: 'Glico Running Man', tip: 'с моста Ebisubashi — классический ракурс; вечером фон горит неоном, но в 22:00+ людей меньше' },
          { spot: 'Tombori Riverwalk', tip: 'набережная у воды — отражения неона, лодки, движение; снимайте с нижнего уровня' },
          { spot: 'Hozenji Yokocho', tip: 'узкий переулок с мхом и фонарями — тихий контраст к неону; романтичный и камерный' },
          { spot: 'Ukiyo alley', tip: 'боковые переулки Дотонбори — гигантские 3D-вывески крабов, осьминогов, драконов; фактурнее главной улицы' },
        ],
      },
      {
        title: 'Osaka Castle — утренний замок',
        duration: '1–1.5 ч',
        bestTime: 'раннее утро, 06:00–08:00',
        stops: [
          { spot: 'Южный ров (Ōtemae)', tip: 'каменные стены + вода + отражение замка; ни одного туриста до 08:00' },
          { spot: 'Nishinomaru Garden', tip: 'сад с видом на замок — панорамный кадр с зеленью на переднем плане (открывается с 09:00)' },
          { spot: 'Внешняя стена восточного рва', tip: 'длинная каменная стена + ряд деревьев — графичная линия, хорошо для прогулочного кадра в движении' },
        ],
      },
    ],
    photoInspo: [
      {
        title: 'Street photo',
        mood: 'неон, еда, хаос, человеческая энергия',
        spots: [
          { location: 'Dotonbori ночью', idea: 'гигантские 3D-вывески (краб, осьминог, Glico) + толпа + отражения в канале — чистый визуальный перегруз' },
          { location: 'Shinsekai', idea: 'ретро-район с башней Tsūtenkaku — выцветшие вывески, пиво, кушикацу; ностальгия и грубая фактура' },
          { location: 'Kuromon Market', idea: 'морепродукты крупным планом — уни на льду, гриль с дымом, руки с палочками; цвет и текстура' },
          { location: 'Hozenji Yokocho', idea: 'моховая статуя в тёмном переулке — контраст тишины и хаоса Дотонбори в 20 метрах' },
          { location: 'Tennoji / Abeno', idea: 'смешение старого и нового — торговые аркады, храмы, небоскрёб Harukas; вертикальные контрасты' },
        ],
      },
      {
        title: 'Fashion / editorial',
        mood: 'неон как свет, река как фон, вечерняя энергия',
        spots: [
          { location: 'Nakanoshima riverfront', idea: 'европейские мосты + река + утренний свет — чистый фон для smart casual; тренч + кофе в руке' },
          { location: 'Tombori Riverwalk', idea: 'неон отражается в воде — вечерний fashion с цветным светом; чёрная одежда + яркий фон' },
          { location: 'Umeda Sky эскалатор', idea: 'футуристический эскалатор в небо — масштаб, линии, sci-fi aesthetic; снимайте снизу вверх' },
          { location: 'Osaka Castle южный ров', idea: 'каменные стены + вода + отражения — строгий, спокойный фон; лучше всего утром' },
          { location: 'Amerikamura', idea: 'стрит-арт стены, граффити, винтажные витрины — casual streetwear editorial; днём при рассеянном свете' },
        ],
      },
    ],
    note: 'Осака здесь не для торжественности. Используйте её для еды, речного света, одного чистого кадра с горизонтом и плавного разгона к раннему вылету из KIX.',
  },
]

export const reservations: Array<
  TableRow & {
    city: string
    venue: string
    what: string
    jpy: string
    rub: string
    note: string
    url?: string
  }
> = [
  {
    id: 'res-rossi',
    city: 'Tokyo',
    venue: 'Rossi',
    what: 'омакасэ-ужин на двоих',
    jpy: '¥28 600',
    rub: '₽14 733',
    note: 'первый красивый ужин; если сил мало после перелёта бери seat only',
    url: 'https://www.tablecheck.com',
  },
  {
    id: 'res-shibuya',
    city: 'Tokyo',
    venue: 'Shibuya Sky',
    what: 'закатный слот на двоих',
    jpy: '¥4 400',
    rub: '₽2 267',
    note: 'лучше бронировать за 30–40 мин до заката',
    url: 'https://www.shibuya-scramble-square.com',
  },
  {
    id: 'res-teamlab',
    city: 'Tokyo',
    venue: 'teamLab Planets',
    what: 'вход по времени на двоих',
    jpy: '¥8 400',
    rub: '₽4 327',
    note: 'лучше в 1-й половине дня, потом вода / закат',
    url: 'https://teamlabplanets.dmm.com',
  },
  {
    id: 'res-camellia',
    city: 'Kyoto',
    venue: 'Camellia',
    what: 'приватная чайная церемония на двоих',
    jpy: '¥16 000',
    rub: '₽8 242',
    note: 'сильная романтическая сцена; бронируйте сейчас',
    url: 'https://www.tea-kyoto.com',
  },
  {
    id: 'res-loka',
    city: 'Kyoto',
    venue: 'Gion Loka',
    what: 'сезонный ужин-курс на двоих',
    jpy: '¥48 000',
    rub: '₽24 727',
    note: 'сильнейший ужин Киото по вкусу',
    url: 'https://www.tablecheck.com',
  },
  {
    id: 'res-jean-georges',
    city: 'Kyoto',
    venue: 'Jean-Georges',
    what: 'дегустационный ужин на двоих',
    jpy: '¥53 000',
    rub: '₽27 303',
    note: 'роскошная альтернатива Gion Loka',
    url: 'https://www.tablecheck.com',
  },
  {
    id: 'res-blue-bottle',
    city: 'Kyoto',
    venue: 'Blue Bottle Studio',
    what: 'кофейный курс по брони на двоих',
    jpy: '¥17 820',
    rub: '₽9 180',
    note: 'только если цените кофейный ритуал',
    url: 'https://store.bluebottlecoffee.jp',
  },
  {
    id: 'res-upstairz',
    city: 'Osaka',
    venue: 'UPSTAIRZ',
    what: 'ужин на двоих',
    jpy: '¥30 000',
    rub: '₽15 455',
    note: 'лучший ужин в последний вечер — без показной роскоши',
    url: 'https://www.tablecheck.com',
  },
  {
    id: 'res-umeda',
    city: 'Osaka',
    venue: 'Umeda Sky',
    what: '2 adults',
    jpy: '¥3 000',
    rub: '₽1 545',
    note: 'лучший лёгкий закатный кадр в Осаке',
    url: 'https://www.kuchu-teien.com',
  },
  {
    id: 'res-cruise',
    city: 'Osaka',
    venue: 'Nakanoshima Cruise',
    what: '2 adults',
    jpy: '¥2 400',
    rub: '₽1 236',
    note: 'мягкое романтическое завершение вечера',
    url: 'https://suijo-bus.osaka',
  },
]

export const wardrobeCapsules: WardrobeCapsule[] = [
  {
    id: 'capsule-tokyo',
    kicker: 'Capsule 01',
    title: 'Токио — городской стиль',
    preview: 'слоновая кость + чёрный + табак, чёткие силуэты, сдержанный блеск',
    forHer:
      'топ цвета ivory или тонкий трикотаж, чёрные прямые брюки или тёмный деним, тренч песочного цвета, тонкий ремень, чистые кроссовки днём / слингбэки вечером, компактная сумка, золотые серьги-кольца',
    forHim:
      'белая или ivory рубашка, трикотажное поло тёмно-синего цвета, угольные брюки со складкой, мягкая рубашка-куртка или неструктурированный блейзер, чистые кроссовки днём / замшевые лоферы вечером, тонкие часы',
    worksBestFor: [
      'Aoyama',
      'Omotesando',
      'Marunouchi',
      'Shibuya Sky',
    ],
    palette: ['#e6dccd', '#151515', '#6e5a44', '#d3c7ba'],
  },
  {
    id: 'capsule-kyoto',
    kicker: 'Capsule 02',
    title: 'Киото — рассветная романтика',
    preview: 'кремовый + шалфей + камень, мягкие текстуры, тихая романтика',
    forHer:
      'кремовое миди-платье или текучая юбка + кардиган, мягкие кожаные балетки или Mary Jane, тонкий шарф, мини-сумка через плечо; если берёте кимоно — приглушённый шалфей, камень, пыльный голубой, без ярких туристических цветов',
    forHim:
      'рубашка цвета экрю, тёмные прямые брюки, тонкий кардиган или куртка без воротника, полированные лоферы или минималистичные кожаные кроссовки',
    worksBestFor: [
      'Yasaka Pagoda',
      'Ninenzaka',
      'Shirakawa',
      'Camellia tea',
    ],
    palette: ['#f0eadf', '#8d987f', '#465a79', '#d4cabb'],
  },
  {
    id: 'capsule-dinner',
    kicker: 'Capsule 03',
    title: 'Ужин / руфтоп / бар',
    preview: 'чёрный + слоновая кость + золото, тонкий блеск, без кричащих логотипов',
    forHer:
      'чёрное slip-платье или прямая юбка с шёлковой блузой, компактная вечерняя сумка, невысокий каблук, тонкие украшения, по желанию — глубокая красная помада',
    forHim:
      'тёмно-синий или чёрный блейзер, чёрные или табачные брюки, трикотажный джемпер или рубашка с открытым воротом, полированные лоферы; без кричащих логотипов и спортивной верхней одежды',
    worksBestFor: ['Rossi', 'Gion Loka', 'Jean-Georges', 'K36', 'UPSTAIRZ'],
    palette: ['#121212', '#f0ece3', '#7a6047', '#2e3551', '#bc3d2f'],
  },
]

export const packingPolish = {
  packThis: [
    'лёгкий тренч или тихая неструктурированная куртка',
    'один тонкий кардиган / один вечерний слой',
    'одна по-настоящему удобная обувь для прогулок',
    'одна парадная пара для ужинов',
    'складной зонт',
    'пластыри от мозолей + модная лента',
    'мини-спрей от складок',
    'матирующие салфетки + ролик для ворсинок',
    'тонкий кожаный кардхолдер / компактная вечерняя сумка',
    'одна камера или телефон — не оба, если это выглядит громоздко',
  ],
  photoPolish: [
    'Токио: чуть более чёткие силуэты, сильнее контраст, городская обувь, которая всё ещё выглядит утончённо.',
    'Киото: смягчите всё — крем, камень, шалфей, табак, шёлк, трикотаж, мягкая кожа.',
    'Осака: чище, темнее, чуть больше блеска для финального вечера.',
    'Волосы / макияж: устойчивые к влажности, сияние без жирного блеска, ничего, что оставляет следы на воротниках.',
    'Украшения: мелкий масштаб на каменных улочках Киото читается богаче крупных statement-вещей.',
    'Правило для пары: координируйте палитру, но никогда не одевайтесь одинаково.',
  ],
  coupleLooks: [
    'Образ 1 / Токио днём: слоновая кость + чёрный + табак',
    'Образ 2 / Киото на рассвете: кремовый + шалфей + камень',
    'Образ 3 / Киото ужин: чёрный + слоновая кость + золото',
    'Образ 4 / Осака последний вечер: тёмно-синий + чёрный + один алый акцент',
  ],
}

export const extras = [
  {
    title: 'Пересылка багажа',
    body: 'Используйте TA-Q-BIN между отелями Токио и Киото / Осаки, чтобы дни в Green Car оставались элегантными. Прилёт в Нариту в 15:55 — слишком поздно для доставки в тот же день, не стройте план дня прилёта вокруг этого.',
  },
  {
    title: 'Пометки об особом поводе',
    body: 'Попросите каждый отель и 2–3 ключевых ресторана сделать пометку о романтическом путешествии / годовщине. Столики у окна, небольшой торт, цветы, записку при заселении и именные таблички лучше запросить отдельно.',
  },
  {
    title: 'План на дождь',
    body: 'Держите один запасной вариант в помещении для каждого города: Токио — teamLab или Nezu, Киото — чай + обед + бар отеля, Осака — Umeda Sky позже + длинный ужин. Дождь в Японии не портит поездку, если заранее продумать разворот.',
  },
  {
    title: 'Фото-этикет Киото',
    body: 'Не заходите на частные улочки Гион, не загораживайте дверные проёмы, не направляйте камеру на дома или тропы гейш, соблюдайте правила еды на рынках. Это важно и социально, и эстетически.',
  },
  {
    title: 'Трансфер в последний вечер',
    body: 'Вылет из KIX в 09:30 — выбирайте отель с удобной базой у Умэды / Кита и определитесь с трансфером в аэропорт накануне. Лимузин-бас до Osaka Station — ¥1 800 с человека; не импровизируйте в 06:00.',
  },
  {
    title: 'Карманный стайлинг-кит',
    body: 'Мини-спрей от складок, модная лента, пластыри от мозолей, матирующие салфетки, маленький ролик для ворсинок, складной зонт и один чистый мешок для сменной обуви улучшают фото куда сильнее, чем лишняя одежда.',
  },
  {
    title: 'Цифровые мелочи',
    body: 'Загрузите Suica / ICOCA на телефон, держите запасную карту для оплаты и сделайте скриншоты ключевых бронирований. Рестораны на TableCheck могут требовать гарантию картой и не прощают поздних отмен.',
  },
]

export const reservationTimeline = [
  {
    label: 'Забронировать сейчас',
    items: [
      'Отели: Киото, Токио, Осака',
      'Shibuya Sky закат, teamLab, Camellia',
      'Gion Loka / Jean-Georges, UPSTAIRZ',
    ],
  },
  {
    label: 'За месяц',
    items: [
      'Места в Nozomi Green Car через SmartEX',
      'Точный трансфер из/в аэропорт',
      'Blue Bottle Studio Kyoto, если хотите',
    ],
  },
  {
    label: 'За неделю',
    items: [
      'Проверка погоды',
      'Финальное решение по рассветам / закатам в каждом городе',
      'Подтверждение ужинов и пометки об особом поводе в отелях',
    ],
  },
  {
    label: 'Накануне',
    items: [
      'Зафиксировать трансфер в KIX',
      'Зарядить устройства',
      'На последнее утро — только лёгкая ручная кладь',
      'Подготовить образы на ужин',
    ],
  },
]

export const bookingLinks: BookingLink[] = [
  { label: 'Aoyama Grand booking', url: 'https://aoyamagrand.com' },
  {
    label: 'Shibuya Sky',
    url: 'https://www.shibuya-scramble-square.com',
  },
  { label: 'Camellia Tea', url: 'https://www.tea-kyoto.com' },
  { label: 'Aoyama Grand restaurants', url: 'https://aoyamagrand.com' },
  { label: 'teamLab Planets', url: 'https://teamlabplanets.dmm.com' },
  { label: 'Gion Loka / TableCheck', url: 'https://www.tablecheck.com' },
  { label: 'The Hotel Seiryu', url: 'https://www.princehotels.com' },
  { label: 'Nezu Museum', url: 'https://www.nezu-muse.or.jp' },
  {
    label: 'Jean-Georges at The Shinmonzen',
    url: 'https://www.tablecheck.com',
  },
  { label: 'SOWAKA', url: 'https://sowaka.com' },
  { label: 'Tsukiji Outer Market', url: 'https://www.tsukiji.or.jp' },
  {
    label: 'Blue Bottle Studio Kyoto',
    url: 'https://store.bluebottlecoffee.jp',
  },
  { label: 'The Shinmonzen', url: 'https://theshinmonzen.com' },
  { label: 'Rossi / TableCheck', url: 'https://www.tablecheck.com' },
  { label: 'UPSTAIRZ / TableCheck', url: 'https://www.tablecheck.com' },
  { label: 'Zentis Osaka', url: 'https://zentishotels.com' },
  { label: 'K36', url: 'https://www.princehotels.com' },
  { label: 'KIX Limousine Bus', url: 'https://www.kate.co.jp' },
  { label: 'smartEX service', url: 'https://smart-ex.jp' },
  { label: 'Benoit Kyoto', url: 'https://www.tablecheck.com' },
  {
    label: 'Narita Express tickets',
    url: 'https://www.jreast.co.jp',
  },
  {
    label: 'Yamato TA-Q-BIN',
    url: 'https://www.kuronekoyamato.co.jp',
  },
]

export type AfterDarkMoment = {
  title: string
  body: string
}

export const afterDark = {
  intro:
    'Когда последний ресторан закрывается и город гасит деловой свет — начинается та часть поездки, которая не попадёт ни в один путеводитель. Здесь нет расписания. Только тело, тишина, пар и правильный полумрак. Всё, что ниже — не для Instagram. Это для вас двоих.',
  moments: [
    {
      title: 'Приватный онсэн',
      body: 'В SOWAKA — собственная ванна хиноки прямо в номере. В Seiryu — закажите приватный слот заранее. Медленно раздеться, войти в горячую воду вместе, молча. Пар обволакивает кожу, дыхание замедляется, руки находят друг друга под водой. Это не SPA — это ритуал, после которого тело говорит на другом языке.',
    },
    {
      title: 'Love hotel — одна ночь',
      body: 'Японская культура приватности, доведённая до откровенности. Осака, район Namba: верхний сегмент (¥12 000–18 000) — джакузи в комнате, проектор на потолке, дизайнерский свет, зеркала, караоке на двоих. Никто вас не слышит, никто не видит, никто не ждёт к завтраку. Одна ночь без правил — ради ощущения, что время остановилось.',
    },
    {
      title: 'Номер как сцена',
      body: 'При заселении попросите: шампанское, лепестки, свечи. Или привезите своё: мини-колонка, плейлист, пара свечей, хороший шоколад. Верхний свет — выключен навсегда. Только торшер у кровати, только мягкие тени на стенах, только силуэты друг друга. Откройте окно — пусть город шумит внизу, пока вы наверху.',
    },
    {
      title: 'Интимный гардероб',
      body: 'Для неё: шёлковая комбинация на тонких бретелях, кружевное бельё, чулки, кимоно-халат нараспашку, тонкая золотая цепочка на голой коже. Для него: тёмные боксеры, юката отеля, расстёгнутая на груди, аромат на шее и запястьях. Бельё — новое, купленное к поездке. Развязывать — медленно.',
    },
    {
      title: 'Тело и запах',
      body: 'После онсэна кожа шёлковая и горячая — не нужен ни крем, ни парфюм. Если не было онсэна — горячая ванна в номере, масло юдзу, мята. Духи — только на точки пульса: запястья, шея, за ушами, ключицы. Она пахнет иначе в Японии — влажность меняет всё. И это красиво.',
    },
    {
      title: 'Бары как прелюдия',
      body: 'Tokyo: Bar BenFiddich (Shinjuku) — алхимический полумрак, ботанические коктейли, рука на колене под барной стойкой. Kyoto: Bar K6 — старое дерево, тихий виски, два бокала, зрительный контакт. Osaka: Bar Nayuta — шесть мест, два коктейля, молчание, которое заводит. Не засиживайтесь — бар здесь только разогрев.',
    },
    {
      title: 'Ночная прогулка',
      body: 'Киото после 22:00 — пустые каменные улочки Хигасиямы, тёплый свет фонарей, шаги на камне, ваши тени сливаются на стене. Остановиться, прижать к стене, поцеловать. Осака — неон Дотонбори с воды, тело к телу на корме лодки. Не фотографируйте. Чувствуйте.',
    },
    {
      title: 'Утро после',
      body: 'Не ставьте будильник. Пусть свет разбудит — мягкий, сквозь японские шторы. Голая спина в утреннем свете — самый красивый кадр поездки, который никто никогда не увидит. Закажите завтрак в номер. Кофе, круассан, свежий сок. Оставайтесь в постели до полудня. Киото подождёт.',
    },
    {
      title: 'Приватная фотосессия',
      body: 'Один вечер — снимите друг друга. Таймер на телефоне, свет из окна или от свечей. Шёлк, кожа, тени, движение. Никаких лиц, если не хотите. Руки, спина, силуэт в дверном проёме, отражение в зеркале ванной. Эти кадры — только для вашей памяти. Удалите плохие сразу — останутся только те, от которых перехватывает дыхание.',
    },
    {
      title: 'Плейлист',
      body: 'Японский city pop, lo-fi, Ryuichi Sakamoto, Nujabes, Sade. Громкость — на грани слышимости. Музыка не должна перекрывать дыхание. Подготовьте один плейлист до поездки — на 3–4 часа, без рекламы, без перерывов. Пусть он станет саундтреком к тому, что вы будете вспоминать через годы.',
    },
  ] as AfterDarkMoment[],
  image: tokyoNight,
}

/* ── per-city builder data ────────────────────────────────── */

export type CityHotelOption = {
  id: string
  name: string
  nights: number
  jpy: string
  mood: string
  image?: ImageAsset
}

export type CityActivity = {
  id: string
  title: string
  description: string
  jpy?: string
}

export type CityBuilderData = {
  slug: string
  label: string
  dateRange: string
  hotels: CityHotelOption[]
  activities: CityActivity[]
}

export const builderCities: CityBuilderData[] = [
  {
    slug: 'tokyo',
    label: 'Токио',
    dateRange: '10–14 May',
    hotels: [
      {
        id: 'tokyo-aoyama',
        name: 'THE AOYAMA GRAND HOTEL',
        nights: 4,
        jpy: '¥376 948',
        mood: 'стильный, молодой, вид на город с The Top',
        image: hotelAoyama,
      },
      {
        id: 'tokyo-trunk',
        name: 'TRUNK (HOTEL)',
        nights: 4,
        jpy: '¥174 720',
        mood: 'дешевле, но со вкусом — Shibuya socialising hotel',
        image: hotelTrunk,
      },
    ],
    activities: [
      { id: 'act-shibuya-sky', title: 'Shibuya Sky — закатный слот', description: 'бронируйте за 30 мин до заката; лучшие силуэтные кадры', jpy: '¥4 400' },
      { id: 'act-teamlab', title: 'teamLab Planets', description: 'вход по времени; лучше утром, потом вода и закат', jpy: '¥6 800' },
      { id: 'act-aoyama-walk', title: 'Aoyama / Omotesando backstreets', description: 'утренние editorial-кадры без толпы' },
      { id: 'act-marunouchi', title: 'Marunouchi Station', description: 'симметрия, красный кирпич — дорого смотрится даже в простом' },
      { id: 'act-shiba', title: 'Shiba Park + Tokyo Tower', description: 'спокойный знаковый городской кадр без суеты' },
    ],
  },
  {
    slug: 'kyoto',
    label: 'Киото',
    dateRange: '14–17 May',
    hotels: [
      {
        id: 'kyoto-seiryu',
        name: 'The Hotel Seiryu',
        nights: 3,
        jpy: '¥198 000',
        mood: 'лучшие виды, фотогеничный, отличная база',
        image: hotelSeiryu,
      },
      {
        id: 'kyoto-sowaka',
        name: 'SOWAKA',
        nights: 3,
        jpy: '¥577 041',
        mood: 'характер старого Киото, рёкан-романтика, онсэн в номере',
        image: hotelSowaka,
      },
      {
        id: 'kyoto-shinmonzen',
        name: 'The Shinmonzen',
        nights: 3,
        jpy: '¥621 438–¥761 438',
        mood: 'арт-мир, максимальный wow, Jean-Georges внизу',
        image: hotelShinmonzen,
      },
    ],
    activities: [
      { id: 'act-camellia', title: 'Camellia — приватный чай', description: 'сильная романтическая сцена; бронируйте заранее', jpy: '¥16 000' },
      { id: 'act-yasaka', title: 'Yasaka Pagoda на рассвете', description: 'пустые улочки, кимоно, камень — лучшие кадры Киото' },
      { id: 'act-shirakawa', title: 'Shirakawa canal вечером', description: 'канал, фонари, ива — классический романтический Киото' },
      { id: 'act-bamboo', title: 'Бамбуковая роща Арасияма', description: 'только на рассвете, иначе — толпа' },
      { id: 'act-blue-bottle', title: 'Blue Bottle Studio', description: 'кофейный курс по брони — только если цените ритуал', jpy: '¥17 820' },
    ],
  },
  {
    slug: 'osaka',
    label: 'Осака',
    dateRange: '17–19 May',
    hotels: [
      {
        id: 'osaka-zentis',
        name: 'Zentis Osaka',
        nights: 2,
        jpy: '¥190 400',
        mood: 'минималистичный, удобная база под KIX',
        image: hotelZentis,
      },
    ],
    activities: [
      { id: 'act-umeda', title: 'Umeda Sky — закат', description: 'лёгкий закатный кадр с горизонтом Осаки', jpy: '¥3 000' },
      { id: 'act-cruise', title: 'Nakanoshima Cruise', description: 'мягкое романтическое завершение вечера на воде', jpy: '¥3 800' },
      { id: 'act-dotonbori', title: 'Dotonbori ночью', description: 'неон, лодки, стрит-фуд — чистая энергия Осаки' },
      { id: 'act-kuromon', title: 'Kuromon Market', description: 'финальный гастро-маршрут; выбирайте, а не объедайтесь' },
    ],
  },
]

export const lastNote = {
  eyebrow: 'LAST NOTE',
  title: 'Почти идеальное начинается после фиксации брони',
  body: 'Если хотите довести это до совершенства: после бронирования отелей и 4–6 якорных слотов следующий шаг — подневный сценарий с точным порядком районов, временем на переезды, одеждой на каждый день и запасным планом на дождь.',
  image: osakaNeon,
}

export const imageCredits = [
  tokyoSunset,
  tokyoNight,
  kyotoDawn,
  kyotoRain,
  osakaRiver,
  osakaNeon,
  tokyoTowerMorning,
  shibuyaSkySunset,
  yasakaStreet,
  shirakawaEvening,
  osakaMorning,
  hotelAoyama,
  hotelSeiryu,
  hotelSowaka,
  hotelShinmonzen,
  hotelZentis,
  hotelTrunk,
]
