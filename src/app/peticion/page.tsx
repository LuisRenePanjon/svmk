import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { localImages } from "@/app/utils/localImages";
import Image from "next/image";
import PdfShower from "@/app/components/pdfShower";
import React from "react";

const groupImages = (images: string[], size: number) => {
  const grouped = [];
  for (let i = 0; i < images.length; i += size) {
    grouped.push(images.slice(i, i + size));
  }
  return grouped;
};

const Peticion = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const groupedImages = groupImages(localImages, 3);

  return (
    <div className="relative w-screen h-screen">
      <PdfShower />
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/3iDMvP8BZxE2Olorh2pWg9?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={"my-3"}
      ></iframe>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {groupedImages.map((group, index) => (
          <div key={index} className="grid gap-4">
            {group.map((image, imgIndex) => (
              <div key={imgIndex}>
                <Image
                  className="h-auto max-w-full rounded-lg"
                  src={image}
                  alt=""
                  width={250}
                  height={200}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peticion;
