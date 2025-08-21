import './globals.css';

export const metadata = {
  title: "Inventory Dashboard",
  description: "Dashboard built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 min-h-screen font-sans">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
