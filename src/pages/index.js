import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Inter } from "@next/font/google";
import Navigation from "@/components/Navigation";
import About from "@/components/About";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({ category: "all" });
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/supabase?category=" + category.category)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setItems([...data]);
      });
  }, [category]);

  return (
    <>
      <Head>
        <title>Curations - Stunning Tools, served daily</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pl-[5%] pr-[5%]">
        <Navigation setCategory={setCategory} />
        {(loading && (
          <div className="flex justify-center items-center h-[75vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          </div>
        )) ||
          (!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
              {items.map((item) => (
                <Link
                  target="_blank"
                  key={item.id}
                  href={item.link}
                  className="rounded-xl shadow-lg flex flex-col gap-2 transition-all hover:scale-[0.98] focus:outline-none focus:ring focus:ring-red-300"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="rounded-lg"
                  />
                  <div className="flex gap-4 place-items-center">
                    <Image
                      src={item.favicon}
                      alt={item.title}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                    <h3 className="font-medium">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ))}
          <About />
      </main>
    </>
  );
}
