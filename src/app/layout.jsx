import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: "Package Management System",
  description:
    "Upload and View Packages.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
        {/* <SessionProvider session={session}>
          {children}
        </SessionProvider> */}
      </body>
    </html>
  );
}
