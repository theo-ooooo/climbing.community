interface Response<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

export default async function Fetch<T>(url: string, options: RequestInit) {
  if (!url) {
    throw new Error("url is required");
  }

  const headers = {
    "Content-type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URI}${url}`,
      {
        ...options,
        headers,
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`에러가 발생하였습니다.`);
    }

    const result: Response<T> = await response.json();

    return result.data;
  } catch (e) {
    console.error(`Fetch error ${url}`, e);
    throw e;
  }
}
