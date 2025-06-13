"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AddAssetDialogProps {
  children?: React.ReactNode
}

export function AddAssetDialog({ children }: AddAssetDialogProps) {
  const router = useRouter()

  const handleAddAsset = (category?: string) => {
    if (category) {
      router.push(`/assets/new?category=${category}`)
    } else {
      router.push("/assets/new")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children || <Button>Add Asset</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>Choose the type of asset you want to add to your vault.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => handleAddAsset("financial")}
          >
            <span className="text-lg font-medium">Financial</span>
            <span className="text-xs text-muted-foreground mt-1">Bank accounts, investments</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => handleAddAsset("property")}
          >
            <span className="text-lg font-medium">Property</span>
            <span className="text-xs text-muted-foreground mt-1">Real estate, vehicles</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => handleAddAsset("document")}
          >
            <span className="text-lg font-medium">Documents</span>
            <span className="text-xs text-muted-foreground mt-1">Insurance, wills, certificates</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => handleAddAsset("digital")}
          >
            <span className="text-lg font-medium">Digital</span>
            <span className="text-xs text-muted-foreground mt-1">Email, social media, crypto</span>
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
