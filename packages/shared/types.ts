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
  price: z.string().describe("Price").min(1, "Price too short"),
  image: z.string().optional(),
});

export const addingStockFormSchema = z.object({
  batchNo: z.string().describe("Batch No").min(1, "Batch No too short"),
  expiryDate: z.date().describe("Expiry Date"),
  quantity: z.string().describe("Quantity").min(1, "Quantity too short"),
});
export const addingCartFormSchema = z.object({
  quantity: z.string().describe("Quantity").min(1, "Quantity too short"),
});

export interface ExtendedFile extends File {
  preview: string;
}

export interface products {
  id: string;
  updatedAt: Date | null;
  name: string;
  price: number | null;
  description: string | null;
  imageUrl: string;
}

export interface stockProducts {
  batchNo: string;
  expiryDate: Date;
  quantity: number;
  productId: string;
  createdAt: Date;
}
