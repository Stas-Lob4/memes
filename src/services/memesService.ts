import { supabase } from "@/lib/supabaseClient";

export interface Meme {
  id: string;
  created_at: string;
  name: string;
  image_path: string;
  likes: number;
}

export const MemesService = {
  async createMeme(name: string, imageFile: File): Promise<Meme> {
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("memes_images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("memes_images").getPublicUrl(filePath);

      const { data, error } = await supabase
        .from("memes")
        .insert([
          {
            name,
            image_path: publicUrl,
            likes: 0,
          },
        ])
        .select();

      if (error) throw error;

      return data[0];
    } catch (error) {
      console.error("Ошибка при создании мема:", error);
      throw error;
    }
  },

  async getAllMemes(): Promise<Meme[]> {
    const { data, error } = await supabase.from("memes").select("*");

    if (error) throw error;

    return data;
  },

  async getMemeById(id: string) {
    const { data, error } = await supabase
      .from("memes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async updateMeme(
    id: string,
    fields: { name?: string; image_path?: string; likes?: number },
  ): Promise<Meme> {
    const updateFields: Record<string, any> = {};

    if (fields.name !== undefined) updateFields.name = fields.name;
    if (fields.image_path !== undefined)
      updateFields.image_path = fields.image_path;
    if (fields.likes !== undefined) updateFields.likes = fields.likes;

    const { data, error } = await supabase
      .from("memes")
      .update(updateFields)
      .eq("id", id)
      .select();

    if (error) throw error;

    return data[0];
  },

  async randomLikeMeme(id: string) {
    const { data, error } = await supabase.rpc("random_increment_likes", {
      meme_id: id,
    });

    if (error) throw error;

    const updatedMeme = await this.getMemeById(id);

    return {
      meme: updatedMeme,
      addedLikes: data,
    };
  },

  async deleteMeme(id: string) {
    try {
      const meme = await this.getMemeById(id);

      if (meme.image_path) {
        const filePath = meme.image_path.split("/").pop();

        await supabase.storage.from("memes_images").remove([filePath]);
      }

      const { error } = await supabase.from("memes").delete().eq("id", id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Ошибка при удалении мема:", error);
      throw error;
    }
  },
};
