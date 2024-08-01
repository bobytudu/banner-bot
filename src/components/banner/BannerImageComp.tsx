import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Heart, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import EditBannerTemplateBS from "./EditBannerTemplateBS";
import { BannerType } from "@/types/banner.types";
import html2canvas from "html2canvas";

export interface BannerImageCompProps extends BannerType {
  setBanner: Dispatch<SetStateAction<BannerType[]>>;
}

export default function BannerImageComp(props: BannerImageCompProps) {
  const [showEditBanner, setShowEditBanner] = React.useState(false);

  const [title, setTitle] = React.useState("Freshness Delivered ");
  const [description, setDescription] = React.useState(
    "Order Online for Home Delivery"
  );
  const [btnText, setBtnText] = React.useState("Order Now");
  const handleDownload = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "capture.png";
          link.click();
        }
      }, "image/png");
    }
  };
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <EditBannerTemplateBS
        {...props}
        open={showEditBanner}
        onClose={() => setShowEditBanner(false)}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        btnText={btnText}
        setBtnText={setBtnText}
      />
      <Card className="w-[350px] border-none">
        <CardContent className="p-0">
          <div
            ref={divRef}
            id="img-container"
            className="relative bg-red-500 min-h-[340px] text-center overflow-hidden"
          >
            <Image
              width={512}
              height={200}
              src="/images/template_2.png"
              className="absolute top-0 left-0 z-10"
              alt={props.alt_description}
            />
            <h3 className="text-2xl text-center py-2 z-10 text-white relative font-light">
              {title}
            </h3>
            <p className="relative text-xl z-10 text-center text-white font-light pb-2">
              {description}
            </p>
            <Button className="relative z-10 ml-auto" variant="outline">
              {btnText}
            </Button>
            <Image
              width={380}
              height={100}
              src={props.url}
              className="absolute top-[150px] left-[45px]"
              alt={props.alt_description}
            />
          </div>
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-3">
              <User />
              <Label htmlFor="terms">
                <a target="_blank" href={props.author_profile_url}>
                  {props.author_name}
                </a>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Heart />
              <Label htmlFor="terms">{props.likes} Likes</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between px-4">
          <Button variant="outline" onClick={() => setShowEditBanner(true)}>
            Edit
          </Button>
          <Button onClick={handleDownload}>
            Download
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
