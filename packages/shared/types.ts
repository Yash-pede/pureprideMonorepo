import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email("Invalid Email"),
  password: z.string().describe("Password").min(1, "Password too short"),
});

export const addProductFormSchema = z.object({
  name: z.string().describe("Product Name").min(1, "Name too short"),
  description: z
    .string()
    .describe("Product Description")
    .min(1, "Description too short"),
  image: z.string().optional(),
});

export interface ExtendedFile extends File {
  preview: string;
}
