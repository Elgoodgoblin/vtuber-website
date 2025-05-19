import { NextResponse } from "next/server"
import { getUserByUsername, extractTwitchUsername } from "@/lib/twitch-api"

export async function GET() {
  try {
    const collaborators = [
      {
        name: "Ghost",
        twitchUrl: "https://www.twitch.tv/ghost_from_vt",
        role: "VTuber",
        description: "Regular collaborator on variety streams and events.",
      },
      {
        name: "Rose",
        twitchUrl: "https://www.twitch.tv/rosepurrnima",
        role: "VTuber",
        description: "Frequent guest for special events and themed streams.",
      },
      {
        name: "Chase",
        twitchUrl: "https://www.twitch.tv/chasethepsychox",
        role: "VTuber",
        description: "Collaborator for gaming sessions and community events.",
      },
      {
        name: "ChoomVT",
        twitchUrl: "https://www.twitch.tv/choomvt",
        role: "VTuber/Artist",
        description: "Collaborator and creator of 3D model, rig, and emotes.",
      },
      {
        name: "Flow",
        twitchUrl: "https://www.twitch.tv/hil_flow",
        role: "VTuber/Artist",
        description: "Collaborator and creator of 2D GIF model.",
      },
    ]

    // Fetch Twitch profile data for each collaborator
    const collaboratorsWithProfiles = await Promise.all(
      collaborators.map(async (collab) => {
        try {
          const username = extractTwitchUsername(collab.twitchUrl)
          const userData = await getUserByUsername(username)

          return {
            ...collab,
            profileImage: userData?.profile_image_url || "/placeholder.svg?height=100&width=100",
            twitchId: userData?.id || "",
          }
        } catch (error) {
          console.error(`Error fetching data for ${collab.name}:`, error)
          return {
            ...collab,
            profileImage: "/placeholder.svg?height=100&width=100",
            twitchId: "",
          }
        }
      }),
    )

    return NextResponse.json({ collaborators: collaboratorsWithProfiles })
  } catch (error) {
    console.error("Error in collaborators API:", error)
    return NextResponse.json({ error: "Failed to fetch collaborators" }, { status: 500 })
  }
}
