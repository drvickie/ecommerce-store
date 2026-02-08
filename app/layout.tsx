import "../src/styles.css"
import Header from "@/components/Header"
import Providers from "./providers"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
        <script src="https://js.paystack.co/v1/inline.js" />
      </body>
    </html>
  )
}
