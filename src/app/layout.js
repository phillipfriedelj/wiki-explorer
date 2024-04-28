import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import ReactQueryClientProvider from "@/components/react-query-client-component";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wiki Explorer",
  description: "Explore wikipedia articles!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <MantineProvider>{children}</MantineProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
