import { NextResponse } from "next/server"
import {
  getUserByUsername,
  getClipsForChannel,
  getVideosForChannel,
  getScheduleForChannel,
  formatViewCount,
  formatDuration,
  formatRelativeTime,
} from "@/lib/twitch-api"

export async function GET() {
  try {
    // Get ElGoodGoblin's Twitch user data
    const userData = await getUserByUsername("elgoodgoblinvt")

    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 })
    }

    // Get clips
    const clips = await getClipsForChannel(userData.id)
    const formattedClips = clips.map((clip: any) => ({
      id: clip.id,
      title: clip.title,
      thumbnail: clip.thumbnail_url,
      url: clip.url,
      duration: clip.duration,
      createdAt: formatRelativeTime(clip.created_at),
      views: formatViewCount(clip.view_count),
      broadcasterName: clip.broadcaster_name,
    }))

    // Get videos (past broadcasts)
    const videos = await getVideosForChannel(userData.id)
    const formattedVideos = videos.map((video: any) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail_url.replace("%{width}", "350").replace("%{height}", "200"),
      url: video.url,
      duration: formatDuration(video.duration_seconds),
      createdAt: formatRelativeTime(video.created_at),
      views: formatViewCount(video.view_count),
      type: video.type,
    }))

    // Get schedule - now with better error handling
    let schedule = { segments: [] }
    try {
      schedule = await getScheduleForChannel(userData.id)
    } catch (error) {
      console.error("Error fetching schedule:", error)
      // We continue even if schedule fails - it's now handled in the getScheduleForChannel function
    }

    return NextResponse.json({
      clips: formattedClips,
      videos: formattedVideos,
      schedule: schedule,
      channelInfo: {
        id: userData.id,
        name: userData.display_name,
        profileImage: userData.profile_image_url,
        description: userData.description,
      },
    })
  } catch (error) {
    console.error("Error in content API:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
