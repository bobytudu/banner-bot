import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { BannerType } from "@/types/banner.types";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface EditBannerTemplateBSProps extends BannerType {
  open: boolean;
  onClose: () => void;
  setBanner: Dispatch<SetStateAction<BannerType[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  btnText: string;
  setBtnText: Dispatch<SetStateAction<string>>;
}
export default function EditBannerTemplateBS(props: EditBannerTemplateBSProps) {
  const { id, setBanner } = props;
  const { toast } = useToast();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const divRef = React.useRef<HTMLDivElement>(null);

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

  const convertToBase64 = useCallback(
    (file: File) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
          const base64String = e.target?.result;
          if (base64String) {
            setBanner((prev) => {
              const tempPrev = prev.map((banner) => {
                if (banner.id === id) {
                  return {
                    ...banner,
                    url: base64String as string,
                  };
                }
                return banner;
              });
              return tempPrev;
            });
          }
        };
        reader.onerror = function (error: any) {
          toast({
            title: "Failed to read file",
            description:
              error.message ||
              "Something went wrong. Please try with different file.",
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [toast, setBanner, id]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) convertToBase64(file);
    },
    [convertToBase64]
  );

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="p-0 border-none">
        <DialogHeader className="p-3 pb-0">
          <DialogTitle>Edit banner</DialogTitle>
        </DialogHeader>
        <div>
          <div
            ref={divRef}
            id="img-container"
            className="relative bg-red-500 min-h-[510px] text-center overflow-hidden"
          >
            <Image
              width={512}
              height={300}
              src="/images/template_2.png"
              className="absolute top-0 left-0 z-10"
              alt={props.alt_description}
            />
            <input
              onChange={handleFileChange}
              type="file"
              ref={inputFileRef}
              className="hidden"
            />
            <h3 className="text-4xl text-center py-4 z-10 text-white relative font-light">
              {props.title}
            </h3>
            <p className="relative text-2xl z-10 text-center text-white font-light pb-5">
              {props.description}
            </p>
            <Button className="relative z-10 ml-auto" variant="outline">
              {props.btnText}
            </Button>
            <Image
              width={380}
              height={100}
              src={props.url}
              className="absolute top-[200px] left-[70px]"
              alt={props.alt_description}
            />
          </div>

          <Button
            onClick={() => inputFileRef.current?.click()}
            variant="outline"
            className="m-4 mb-0"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Image
          </Button>
          <div className="p-4">
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="btn_text">Button Text</Label>
              <Input
                id="btn_text"
                value={props.btnText}
                onChange={(e) => props.setBtnText(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="p-3 pt-0">
          <Button variant="outline" onClick={handleDownload}>
            Download
          </Button>
          <Button onClick={props.onClose}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
