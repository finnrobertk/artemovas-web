export const metadata = {
  title: 'Artemova Beauty Studio',
  description: 'Content management system for Artemova Beauty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 