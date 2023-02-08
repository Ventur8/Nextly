import { Header_component } from "./components/header";
import MusicPlayerSlider from "./components/player";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header_component />
        {children}
        <footer>
          <div className="musicbox">
            <MusicPlayerSlider />
          </div>
        </footer>
      </body>
    </html>
  );
}
