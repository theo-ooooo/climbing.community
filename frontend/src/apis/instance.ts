interface Response<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: { [key: string]: any };
  query?: object;
}

export default async function Fetch<T>(url: string, options: FetchOptions) {
  if (!url) {
    throw new Error("url is required");
  }

  const requestInit: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  if (options.headers) {
    requestInit.headers = { ...requestInit.headers, ...options.headers };
  }

  if (options.body) {
    requestInit.body = JSON.stringify(options.body);
  }

  if (options.query) {
    const queryString = new URLSearchParams(
      options.query as Record<string, string>
    ).toString();
    url = `${url}?${queryString}`;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URI}${url}`,
      requestInit
    );

    // 토큰 만료.
    if (response.status === 401) {
    }

    if (!response.ok) {
      console.log(response);
      throw new Error(`에러가 발생하였습니다.`);
    }

    const result: Response<T> = await response.json();

    return result.data;
  } catch (e) {
    console.error(`Fetch error ${url}`, e);
    throw e;
  }
}
