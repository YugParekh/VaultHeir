import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { requireAuth } from "@/lib/auth"
import { FileText, Plus } from "lucide-react"

export default async function DigitalWillPage() {
  const user = await requireAuth()

  return (
    <>
      <DashboardHeader heading="Digital Will" text="Create and manage your digital will and final wishes">
        <Button asChild>
          <a href="/will/create">
            <Plus className="mr-2 h-4 w-4" /> Create Will
          </a>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="wishes">Final Wishes</TabsTrigger>
          <TabsTrigger value="messages">Farewell Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Will Status</CardTitle>
              <CardDescription>Current status of your digital will</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">Will Creation</p>
                  <p className="text-sm text-muted-foreground">Basic will document</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FileText className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">Asset Distribution</p>
                  <p className="text-sm text-muted-foreground">How your assets will be distributed</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <FileText className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">Final Wishes</p>
                  <p className="text-sm text-muted-foreground">Your preferences for final arrangements</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <FileText className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Farewell Messages</p>
                  <p className="text-sm text-muted-foreground">Messages to be delivered to loved ones</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <FileText className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Last updated:</span> June 10, 2025
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Will Execution</CardTitle>
              <CardDescription>How your digital will is executed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Verification Process</h3>
                <p className="text-sm text-muted-foreground">
                  Your digital will is executed after your passing is verified through our multi-step verification
                  process:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Death certificate verification</li>
                  <li>Confirmation by primary heir</li>
                  <li>Secondary verification by legal executor (if specified)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Distribution Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  After verification, your assets and messages are distributed according to your specified timeline:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Immediate access to critical documents</li>
                  <li>48-hour waiting period for financial assets</li>
                  <li>Scheduled delivery of farewell messages</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <a href="/will/execution-settings">Customize Execution Settings</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Will Documents</CardTitle>
              <CardDescription>Legal documents related to your will</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">Digital Will</p>
                  <p className="text-sm text-muted-foreground">Created on June 10, 2025</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/will/documents/digital-will">View</a>
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Asset Distribution Plan</p>
                  <p className="text-sm text-muted-foreground">Last updated on June 10, 2025</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/will/documents/asset-distribution">View</a>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/will/documents/upload">
                  <Plus className="mr-2 h-4 w-4" /> Upload Document
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wishes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Final Wishes</CardTitle>
              <CardDescription>Your preferences for final arrangements</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't specified any final wishes yet</p>
              <Button asChild>
                <a href="/will/wishes/create">
                  <Plus className="mr-2 h-4 w-4" /> Add Final Wishes
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Farewell Messages</CardTitle>
              <CardDescription>Messages to be delivered to your loved ones</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any farewell messages yet</p>
              <Button asChild>
                <a href="/will/messages/create">
                  <Plus className="mr-2 h-4 w-4" /> Create Message
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
