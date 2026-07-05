import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css"; // ถ้าไม่มีไฟล์นี้ สามารถลบบรรทัดนี้ได้ครับ

export const metadata: Metadata = {
  title: "Pokedex Ultimate",
  description: "My Pokemon Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#fafafa' }}>
        <Navbar />
        {/* คอนเทนเนอร์หลักสำหรับจัดให้อยู่ตรงกลาง */}
        <main style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 24px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}