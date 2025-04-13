import { Repo } from "../types/repo";

const BASE_URL = "https://api.github.com/users/google";

export async function fetchGoogleRepos(): Promise<Repo[]> {
  try {
    // TODO create queryParam builder function
    const response = await fetch(`${BASE_URL}/repos?per_page=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Google repos:", error);
    return [];
  }
}
