import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer"
import EditMode from "./EditMode";

/* VAI_METADATA_INJECT */
export const metadata: Metadata = {
  title: "500Kcal.fit | Food delivery",
  description: "500Kcal.fit — professional Food delivery services",
};
/* VAI_METADATA_INJECT_END */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EditMode />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
