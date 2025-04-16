import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { MemesService } from "@/services/memesService.ts";

export default function TablePage() {
  const [memes, setMemes] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMeme, setSelectedMeme] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      const newMemes = await MemesService.getAllMemes();

      if (newMemes?.length > 0) {
        setMemes(newMemes);
        console.log("Memes fetched successfully:", newMemes);
      }
    };

    fetchMemes();
  }, []);

  console.log(memes);

  const columns: { key: string; label: string }[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "image",
      label: "IMAGE",
    },
    {
      key: "likes",
      label: "LIKES",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Table memes</h1>
        </div>
        <div className="inline-block text-center justify-center w-full max-w-3xl">
          <Table className=" w-full  min-w-full overflow-hidden">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-center">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={memes}>
              {(item) => (
                <TableRow key={item?.id}>
                  {(columnKey) => (
                    <TableCell className="text-center">
                      {columnKey === "image" ? (
                        <a
                          className="underline block md:max-w-[400px] md:truncate"
                          href={getKeyValue(item, "image_path")}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="hidden md:inline">
                            {getKeyValue(item, "image_path")}
                          </span>
                          <span className="inline md:hidden">View</span>
                        </a>
                      ) : columnKey === "action" ? (
                        <Button
                          onPress={() => {
                            setSelectedMeme(item);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Meme
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                  <Input
                    isReadOnly
                    label="ID"
                    value={selectedMeme?.id?.toString() || ""}
                  />
                  <Input
                    label="Name"
                    value={selectedMeme?.name || ""}
                    onChange={(e) =>
                      setSelectedMeme((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Image URL (.jpg)"
                    value={selectedMeme?.image_path || ""}
                    onChange={(e) =>
                      setSelectedMeme((prev) => ({
                        ...prev,
                        image_path: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Likes"
                    max={99}
                    min={0}
                    type="number"
                    value={selectedMeme?.likes?.toString() || "0"}
                    onChange={(e) =>
                      setSelectedMeme((prev) => ({
                        ...prev,
                        likes: parseInt(e.target.value),
                      }))
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={async () => {
                      const imageUrl = selectedMeme?.image_path || "";

                      try {
                        new URL(imageUrl);
                      } catch {
                        alert("Please enter a valid image URL.");

                        return;
                      }

                      try {
                        const updated = await MemesService.updateMeme(
                          selectedMeme.id,
                          {
                            name: selectedMeme.name,
                            image_path: selectedMeme.image_path,
                            likes: selectedMeme.likes,
                          },
                        );

                        setMemes((prev) =>
                          prev.map((m) => (m.id === updated.id ? updated : m)),
                        );

                        onClose();
                      } catch (error) {
                        alert(
                          "Failed to update meme. Check console for details.",
                        );
                        console.error(error);
                      }
                    }}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </DefaultLayout>
  );
}
