import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function SetupGuide() {
  return (
    <Card className="border-[#4d9e4d]/50 bg-[#2a1a09]">
      <CardHeader>
        <CardTitle className="text-[#4d9e4d]">Twitch API Integration Setup</CardTitle>
        <CardDescription>Follow these steps to enable Twitch integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-[#1a0f00] border-[#4d9e4d]/30">
          <InfoIcon className="h-4 w-4 text-[#4d9e4d]" />
          <AlertTitle>Required Configuration</AlertTitle>
          <AlertDescription>To enable Twitch integration, you need to set up environment variables.</AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">1. Create a Twitch Developer Application</h3>
            <p className="text-sm text-[#e8d5b5]/70">
              Visit the{" "}
              <a
                href="https://dev.twitch.tv/console/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4d9e4d] underline"
              >
                Twitch Developer Console
              </a>{" "}
              and create a new application.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">2. Set OAuth Redirect URL</h3>
            <p className="text-sm text-[#e8d5b5]/70">
              Set the OAuth Redirect URL to{" "}
              <code className="bg-[#1a0f00] px-1 py-0.5 rounded">http://localhost:3000</code> for local development.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">3. Get Client ID and Secret</h3>
            <p className="text-sm text-[#e8d5b5]/70">
              After creating your application, you'll receive a Client ID and you can generate a Client Secret.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">4. Add Environment Variables</h3>
            <p className="text-sm text-[#e8d5b5]/70">
              Create a <code className="bg-[#1a0f00] px-1 py-0.5 rounded">.env.local</code> file in your project root
              with:
            </p>
            <pre className="bg-[#1a0f00] p-3 rounded-md text-xs mt-2 overflow-x-auto">
              <code>
                TWITCH_CLIENT_ID=your_client_id_here
                <br />
                TWITCH_CLIENT_SECRET=your_client_secret_here
              </code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">5. Restart Your Development Server</h3>
            <p className="text-sm text-[#e8d5b5]/70">
              After adding the environment variables, restart your development server for the changes to take effect.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
