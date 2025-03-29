export const metadata = {
  title: 'Artemova Beauty Studio',
  description: 'Content management system for Artemova Beauty',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden" suppressHydrationWarning>
      {children}
    </div>
  );
} 