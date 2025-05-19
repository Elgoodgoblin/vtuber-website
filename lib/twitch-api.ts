// Twitch API helper functions

// Twitch API endpoints
const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token"
const TWITCH_API_URL = "https://api.twitch.tv/helix"

// Function to get Twitch OAuth token
async function getTwitchToken() {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Twitch API credentials not configured")
  }

  const response = await fetch(
    `${TWITCH_AUTH_URL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: "POST",
    },
  )

  if (!response.ok) {
    throw new Error("Failed to get Twitch token")
  }

  const data = await response.json()
  return data.access_token
}

// Function to get user data by username
export async function getUserByUsername(username: string) {
  const token = await getTwitchToken()
  const clientId = process.env.TWITCH_CLIENT_ID

  const response = await fetch(`${TWITCH_API_URL}/users?login=${username}`, {
    headers: {
      "Client-ID": clientId!,
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }

  const data = await response.json()
  return data.data[0] || null
}

// Function to get clips for a channel
export async function getClipsForChannel(broadcasterId: string, limit = 6) {
  const token = await getTwitchToken()
  const clientId = process.env.TWITCH_CLIENT_ID

  const response = await fetch(`${TWITCH_API_URL}/clips?broadcaster_id=${broadcasterId}&first=${limit}`, {
    headers: {
      "Client-ID": clientId!,
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch clips")
  }

  const data = await response.json()
  return data.data || []
}

// Function to get videos (past broadcasts) for a channel
export async function getVideosForChannel(userId: string, limit = 4) {
  const token = await getTwitchToken()
  const clientId = process.env.TWITCH_CLIENT_ID

  const response = await fetch(`${TWITCH_API_URL}/videos?user_id=${userId}&first=${limit}`, {
    headers: {
      "Client-ID": clientId!,
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch videos")
  }

  const data = await response.json()
  return data.data || []
}

// Function to get schedule for a channel
export async function getScheduleForChannel(broadcasterId: string) {
  try {
    const token = await getTwitchToken()
    const clientId = process.env.TWITCH_CLIENT_ID

    const response = await fetch(`${TWITCH_API_URL}/schedule?broadcaster_id=${broadcasterId}`, {
      headers: {
        "Client-ID": clientId!,
        Authorization: `Bearer ${token}`,
      },
    })

    // If the response is 404, it means the channel doesn't have a schedule
    if (response.status === 404) {
      console.log("Channel doesn't have a schedule configured")
      return { segments: [] }
    }

    if (!response.ok) {
      console.error(`Schedule API error: ${response.status} ${response.statusText}`)
      return { segments: [] }
    }

    const data = await response.json()

    // Check if the data has the expected structure
    if (!data.data || !data.data.segments) {
      console.log("Schedule data doesn't have the expected structure:", data)
      return { segments: [] }
    }

    return data.data
  } catch (error) {
    console.error("Error in getScheduleForChannel:", error)
    // Return empty schedule instead of throwing
    return { segments: [] }
  }
}

// Helper function to extract username from Twitch URL
export function extractTwitchUsername(url: string): string {
  // Handle URLs like https://www.twitch.tv/username
  const match = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)/)
  return match ? match[1] : ""
}

// Format view count
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

// Format duration (from seconds to HH:MM:SS)
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

// Format date (relative time)
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  } else {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} month${months > 1 ? "s" : ""} ago`
  }
}
