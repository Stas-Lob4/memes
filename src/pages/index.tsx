import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Welcome to&nbsp;</span>
          <span className={title({ color: "violet" })}>Memeland&nbsp;</span>
          <br />
          <span className={title()}>the world of the best memes!</span>
          <div className={subtitle({ class: "mt-4" })}>
            Choose your preferred format to browse memes: table or cards.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={"/table"}
          >
            Table
          </Link>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={"/cards"}
          >
            Cards
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
