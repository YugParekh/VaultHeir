import { BanknoteIcon as Bank, Building, FileText, Home, Lock, Plus, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetCard } from "@/components/asset-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { requireAuth } from "@/lib/auth"
import { getDashboardStats, getAssetsByCategory } from "@/lib/db"

export default async function Dashboard() {
  const user = await requireAuth()

  // Get dashboard stats
  const stats = await getDashboardStats(user.id)

  // Get assets by category
  const financialAssets = await getAssetsByCategory(user.id, "financial")
  const propertyAssets = await getAssetsByCategory(user.id, "property")
  const documentAssets = await getAssetsByCategory(user.id, "document")
  const digitalAssets = await getAssetsByCategory(user.id, "digital")

  return (
    <DashboardShell user={user}>
      <DashboardHeader heading="Dashboard" text="Manage your digital assets and legacy planning">
        <AddAssetButton />
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssets}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vault Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vaultCompletion}%</div>
            <Progress value={stats.vaultCompletion} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nominated Heirs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nominatedHeirs}</div>
            <p className="text-xs text-muted-foreground">Primary and secondary contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.securityStatus}</div>
            <p className="text-xs text-muted-foreground">Last check: 2 hours ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="mt-6">
        <TabsList>
          <TabsTrigger value="financial">Financial Assets</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="digital">Digital Assets</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {financialAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                icon={<Bank className="h-5 w-5" />}
                details={asset.details}
              />
            ))}
            <AddAssetButton category="financial" />
          </div>
        </TabsContent>
        <TabsContent value="property" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {propertyAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                icon={
                  asset.type.includes("Commercial") ? <Building className="h-5 w-5" /> : <Home className="h-5 w-5" />
                }
                details={asset.details}
              />
            ))}
            <AddAssetButton category="property" />
          </div>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <div className="gri gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documentAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                icon={
                  asset.type.includes("Insurance") ? <Shield className="h-5 w-5" /> : <FileText className="h-5 w-5" />
                }
                details={asset.details}
              />
            ))}
            <AddAssetButton category="document" />
          </div>
        </TabsContent>
        <TabsContent value="digital" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {digitalAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                icon={<Lock className="h-5 w-5" />}
                details={asset.details}
              />
            ))}
            <AddAssetButton category="digital" />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function AddAssetButton({ category }: { category?: string }) {
  return (
    <Button variant="outline" className={category ? "h-[180px] border-dashed" : ""} asChild>
      <a href={`/assets/new${category ? `?category=${category}` : ""}`}>
        <Plus className="mr-2 h-4 w-4" />
        {category ? `Add ${category.charAt(0).toUpperCase() + category.slice(1)} Asset` : "Add Asset"}
      </a>
    </Button>
  )
}
