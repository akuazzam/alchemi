import { Inter } from "next/font/google";
import "./components/Ui/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alchemi",

  description: "Your Ai tutor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>

  );
}
