import { baseUrl } from "../lib/constants";
import { Repo } from "../types/repo";

export async function fetchGoogleRepos(): Promise<Repo[]> {
  try {
    // TODO create queryParam builder function
    const response = await fetch(`${baseUrl}/repos?per_page=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Google repos:", error);
    return [];
  }
}
