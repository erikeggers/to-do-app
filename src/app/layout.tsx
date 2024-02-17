import { TodoContextProvider } from "@/contexts/TodoContext";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "To-do App",
  description: "Created by Erik Eggers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TodoContextProvider>{children}</TodoContextProvider>
      </body>
    </html>
  );
}
