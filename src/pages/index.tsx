import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-6xl font-bold">EEAA</h1>
    </div>
  );
}

