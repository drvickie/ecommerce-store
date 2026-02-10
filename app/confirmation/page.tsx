import { Suspense } from "react"
import ConfirmationClient from "@/components/ConfirmationClient"

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmationClient />
    </Suspense>
  )
}
