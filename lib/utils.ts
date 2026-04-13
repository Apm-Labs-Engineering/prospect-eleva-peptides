export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (res.status === 204) {
    return null as unknown as T;
  }

  if (!res.ok) {
    const errorObject = await res.json().catch(() => ({}));
    throw new Error(errorObject.error || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}
