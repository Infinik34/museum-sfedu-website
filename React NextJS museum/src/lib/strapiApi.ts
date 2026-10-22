const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Базовая функция для GET-запросов
async function fetchStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
  const url = `${STRAPI_URL}${endpoint}${queryString}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR: кэш на 1 минуту (был час 3600)
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error(`Strapi API Error: ${res.status} - ${res.statusText}`);
  }

  return res.json();
}

export type NewsItem = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  image: { url: string; alternativeText: string | null } | null;
};

export type StaffItem = {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: { url: string; alternativeText: string | null } | null;
};

export type ExhibitItem = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;  // Добавь, если есть такое поле
  categories: ExhibitCategoryItem[];
  year: number | null;
  isDisplayed: boolean;
  image: {
    url: string;
    alternativeText: string | null;
    caption?: string | null;
  } | null;
};

export type PersonalityItem = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  categories: PersonalityCategoryItem[];
  image: {
    url: string;
    alternativeText: string | null;
    caption?: string | null;
  } | null;
};

export type ExhibitCategoryItem = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isMain: boolean;
  isForMainPage: boolean;
};

export type PersonalityCategoryItem = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isMain: boolean;
  isForMainPage: boolean;
};

export type EventCalendarItem = {
  documentId: string;
  date: string;
  time?: string | null;
  info?: string | null;
};


/** Получить список новостей */
// Версия до новостей по фильтру
// export async function getNews(page = 1, pageSize = 10) {
//   return fetchStrapi<{ data: NewsItem[]; meta: any }>('/api/news-items', {
//     'populate': 'image',
//     'filters[isPublished][$eq]': 'true',
//     'sort[publishedAt]': 'desc',
//     'pagination[page]': page.toString(),
//     'pagination[pageSize]': pageSize.toString(),
//   });
// }

export async function getNews(page: number = 1, from?: string | null, to?: string | null) {
  const baseUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/news-items`;

  let query = `?pagination[page]=${page}&pagination[pageSize]=9&sort=publishedAt:desc&populate=image`;

  if (from) {
    // Начало дня по МСК = 21:00 предыдущего дня по UTC
    query += `&filters[publishedAt][$gte]=${encodeURIComponent(from + 'T00:00:00.000+03:00')}`;
  }
  if (to) {
    // Конец дня по МСК = 20:59:59.999 следующего дня по UTC
    query += `&filters[publishedAt][$lte]=${encodeURIComponent(to + 'T23:59:59.999+03:00')}`;
  }

  try {
    const res = await fetch(`${baseUrl}${query}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 9, pageCount: 0, total: 0 } } };
  }
}

export async function getLatestNews(limit = 3) {
  return fetchStrapi<{ data: NewsItem[]; meta: any }>('/api/news-items', {
    'populate': 'image',
    'filters[isPublished][$eq]': 'true',
    'sort[publishedAt]': 'desc',
    'pagination[page]': '1',
    'pagination[pageSize]': limit.toString(),
  });
}

/** Получить одну новость по slug */
export async function getNewsBySlug(slug: string) {
  const res = await fetchStrapi<{ data: NewsItem[] }>('/api/news-items', {
    'filters[slug][$eq]': slug,
    'populate': 'image',
  });
  return res.data[0] || null;
}

/** Получить список сотрудников */
export async function getStaff() {
  const res = fetchStrapi<{ data: StaffItem[] }>('/api/staff-items', {
    'populate': 'photo',
    'sort[name]': 'asc',
  });
  const validStaff = (await res).data.filter((item) => {
    return item.name && item.name.trim().length > 1;
  });

  return {
    ...res,
    data: validStaff,
  };
}

export async function getExhibits(categorySlugs?: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  // базовые параметры
  const parts = [
    'populate[image]=true',
    'populate[categories]=true',
    'sort[title]=asc'
  ];

  // фильтр категорий
  if (categorySlugs && categorySlugs.length > 0) {
    if (categorySlugs.length === 1) {
      // Для одной категории используем простой $eq
      parts.push(`filters[categories][slug][$eq]=${categorySlugs[0]}`);
    } else {
      // Для нескольких категорий используем рабочий $or с индексами
      categorySlugs.forEach((slug, index) => {
        parts.push(`filters[$or][${index}][categories][slug][$eq]=${slug}`);
      });
    }
  }

  // URL
  const queryString = parts.join('&');
  const url = `${baseUrl}/api/exhibits?${queryString}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Strapi Error:', errorText);
    throw new Error(`Strapi API Error: ${res.status}`);
  }

  const json = await res.json();
  return { data: json.data || [], meta: json.meta };
}

export async function getPersonalities(categorySlugs?: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const parts = [
    'populate[image]=true',
    'populate[razdely_personalijs]=true',
    'sort[name]=asc',
  ];

  if (categorySlugs && categorySlugs.length > 0) {
    if (categorySlugs.length === 1) {
      parts.push(`filters[razdely_personalijs][slug][$eq]=${categorySlugs[0]}`);
    } else {
      categorySlugs.forEach((slug, index) => {
        parts.push(`filters[$or][${index}][razdely_personalijs][slug][$eq]=${slug}`);
      });
    }
  }

  const queryString = parts.join('&');
  const url = `${baseUrl}/api/personaliis?${queryString}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Strapi Error:', errorText);
    throw new Error(`Strapi API Error: ${res.status}`);
  }

  const json = await res.json();
  return { data: json.data || [], meta: json.meta };
}


export async function getExhibitBySlug(slug: string) {
  const params = new URLSearchParams({
    'populate[image]': 'true',
    'populate[categories]': 'true',
    'filters[slug][$eq]': slug,
  });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exhibits?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const json = await res.json();

  const item = json.data?.[0];
  if (!item || !item.title) return null;

  return item;
}


export async function getPersonalityBySlug(slug: string) {
  const params = new URLSearchParams({
    'populate[image]': 'true',
    'populate[razdely_personalijs]': 'true',
    'filters[slug][$eq]': slug,
  });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/personaliis?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const json = await res.json();

  const item = json.data?.[0];
  if (!item || !item.name) return null;

  return item;
}


export async function getBookings() {
  const dateFromStr = new Date().toISOString().split('T')[0];
  
  return fetchStrapi<{ data: any[] }>('/api/bookings', {
    'fields': 'date,time,isFullDay',
    'filters[date][$gte]': dateFromStr,
    'sort': 'date:asc',
  });
}



/* Получить список всех категорий для фильтров */
export async function getExhibitCategories(options?: {
  onlyMain?: boolean;       // для фильтров на странице экспозиции (isMain)
  forMainPage?: boolean;    // для главной страницы (isForMainPage)
  limit?: number;
}) {
  const params: Record<string, string> = {
    'sort[name]': 'asc',
    'fields': 'name,slug,isMain,isForMainPage', // Не забываем запросить новое поле
    'pagination[pageSize]': (options?.limit ?? 100).toString(),
  };

  // Фильтр для страницы экспозиции
  if (options?.onlyMain) {
    params['filters[isMain][$eq]'] = 'true';
  }

  // Фильтр для главной страницы
  if (options?.forMainPage) {
    params['filters[isForMainPage][$eq]'] = 'true';
  }

  const res = await fetchStrapi<{ data: ExhibitCategoryItem[] }>('/api/categories', params);

  const valid = res.data.filter((cat) => cat.name && cat.slug);
  return { ...res, data: valid };
}

export async function getPersonalityCategories(options?: {
  onlyMain?: boolean;
  forMainPage?: boolean;
  limit?: number;
}) {
  const params: Record<string, string> = {
    'sort[name]': 'asc',
    'fields': 'name,slug,isMain,isForMainPage', // Добавили новое поле
    'pagination[pageSize]': (options?.limit ?? 100).toString(),
  };

  if (options?.onlyMain) {
    params['filters[isMain][$eq]'] = 'true';
  }

  if (options?.forMainPage) {
    params['filters[isForMainPage][$eq]'] = 'true';
  }

  const res = await fetchStrapi<{ data: PersonalityCategoryItem[] }>('/api/razdely-personalijs', params);

  const valid = res.data.filter((cat) => cat.name && cat.slug);
  return { ...res, data: valid };
}




/* Запросы для редактирования заголовков и тд */

export async function getNewsPageSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/nastrojka-straniczy-novostej?populate=*`, {
    next: { revalidate: 20 }
  });
  const data = await res.json();
  return data.data;
}

export async function getMainPageSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/nastrojka-glavnoj-straniczy?populate=*`, {
    next: { revalidate: 20 }
  });
  const data = await res.json();
  return data.data;
}

export async function getHistoryPageSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/nastrojka-straniczy-istorii?populate=*`, {
    next: { revalidate: 20 }
  });
  const data = await res.json();
  return data.data;
}

export async function getExhibitionPageSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/nastrojka-straniczy-ekspoziczii?populate=*`, {
    next: { revalidate: 20 }
  });
  const data = await res.json();
  return data.data;
}

export async function getAboutPageSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/nastrojka-straniczy-about?populate=*`, {
    next: { revalidate: 20 }
  });
  const data = await res.json();
  return data.data;
}

export async function getCalendarEvents() {
  const res = await fetchStrapi<{ data: any[] }>('/api/kalendar-sobytijs', {
    'fields': 'date,time,info',
    'sort': 'date:asc',
  });

  const formattedData = res.data.map((item) => {
    let formattedDate = item.date;

    if (formattedDate && formattedDate.includes('/')) {
      const [day, month, year] = formattedDate.split('/');
      formattedDate = `${year}-${month}-${day}`;
    }

    return {
      ...item,
      date: formattedDate,
    };
  });

  return { ...res, data: formattedData };
}