import type { HackathonResponse } from "./types"

export async function fetchHackathons(): Promise<HackathonResponse> {
  const response = await fetch(process.env.NEXT_PUBLIC_HACKATHONS_API_URL as string, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  })

  if (!response.ok) {
    throw new Error("Failed to fetch hackathons")
  }

  return response.json()
}

export async function registerUser(username: string, email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}

export async function fetchUserProfile(userId: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch user profile");
  }

  return response.json();
}

export async function updateUserProfile(userId: string, email: string, bio: string, avatar: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, bio, avatar }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user profile");
  }

  return response.json();
}

export async function favoriteHackathon(userId: string, hackathonId: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hackathon_id: hackathonId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to favorite hackathon");
  }

  return response.json();
}

export async function unfavoriteHackathon(userId: string, hackathonId: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}/favorite/${hackathonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to unfavorite hackathon");
  }

  return response.json();
}

export async function fetchFavoritedHackathons(userId: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch favorited hackathons");
  }

  return response.json();
}

export async function getHackathonById(id: string): Promise<Hackathon | null> {
  const response = await fetch(`/data.json`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hackathons");
  }

  const data: HackathonResponse = await response.json();
  const hackathon = data.hackathons.find((h) => h._id === id);

  return hackathon || null;
}

export async function loginUser(credentials: any): Promise<any> {
  console.log("Attempting to log in user:", credentials.username);
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Login failed:", errorData);
    throw new Error(errorData.message || "Login failed");
  }

  const successData = await response.json();
  console.log("Login successful:", successData);
  return successData;
}
