export async function getBrokers() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${API_URL}/data`, {
   
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brokers");
  }

  const data = await response.json();

  return Array.isArray(data.message) ? data.message : [];
}