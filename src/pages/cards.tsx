import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Meme, MemesService } from "@/services/memesService.ts";

export default function CardsPage() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const newMemes = await MemesService.getAllMemes();

      if (newMemes && newMemes?.length > 0) {
        setMemes(newMemes);
        console.log("Memes fetched successfully:", newMemes);
      }
    };

    fetchMemes();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-7xl w-full text-center justify-center">
          <h1 className={title()}>Cards</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-center justify-center items-center">
            {memes.map((meme) => (
              <Card key={meme.id} className="w-full max-w-xs h-[400px] p-2">
                <CardBody className="overflow-visible py-2 h-[300px] flex items-center justify-center p-1 bg-black rounded-lg">
                  <Image
                    alt={meme.name}
                    className="object-contain max-w-full  h-[300px] "
                    src={
                      meme.image_path ||
                      "https://heroui.com/images/hero-card-complete.jpeg"
                    }
                  />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 items-start flex justify-between">
                  <div>
                    <p className="text-tiny uppercase font-bold ">
                      {meme.name}
                    </p>
                    <small className="text-default-500">
                      {meme.likes} likes
                    </small>
                  </div>

                  <Link
                    isBlock
                    showAnchorIcon
                    color="success"
                    href={meme.image_path}
                  >
                    View
                  </Link>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
