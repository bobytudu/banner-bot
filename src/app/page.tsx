"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import BannerImageComp from "@/components/banner/BannerImageComp";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { BannerType } from "@/types/banner.types";
import bannerData from "./data.json";

export default function Home() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [banners, setBanners] = useState<BannerType[]>([]);

  const getBanners = useCallback(async () => {
    try {
      // const { data } = await axios.post(
      //   "https://zxlfebn5bmjewfy2dp5cihqs7m0azmlb.lambda-url.ap-south-1.on.aws/",
      //   {
      //     query,
      //   }
      // );
      setBanners(bannerData.images);
      setQuery("");
    } catch (error: any) {
      toast({
        title: "Failed to generate banners",
        description:
          error.message || "Something went wrong. Please try again later.",
      });
    }
  }, [toast]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#000]">
      {banners.length > 0 ? (
        <>
          <h4 className="text-4xl font-normal my-5 text-white">Generated Banners</h4>
          <div className="flex flex-wrap gap-4 justify-center w-full p-5 container">
            {banners.map((banner, index) => (
              <BannerImageComp setBanner={setBanners} key={index} {...banner} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <Image
            src="/images/logo.webp"
            className="m-auto mb-4"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-6xl font-light mb-8 text-white">
            AI Banner maker
          </h1>
          <Textarea
            placeholder="Enter Prompt to generate banners."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            className="w-full mt-3 bg-[#000] text-white"
            variant="outline"
            onClick={getBanners}
          >
            Generate Banners
          </Button>
        </div>
      )}
    </main>
  );
}
