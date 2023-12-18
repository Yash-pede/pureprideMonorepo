"use client";
import React, { useCallback, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../shadCnExport";
import {
  LoaderIcon,
  Plus,
  PlusCircle,
  PlusSquare,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ExtendedFile, addProductFormSchema } from "@repo/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"

const ProductsNav = () => {
  const supabase = createClientComponentClient();
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedfiles: any) => {
    if (acceptedFiles.length > 0) {
      setFiles(() => [
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejected.length > 0) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedfiles]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 5000,
    maxFiles: 1,
  });


  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  // const removeRejected = (name: any) => {
  //   setRejected((files) => files.filter(({ file:File }) => file.name !== name));
  // };

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  async function action() {
    const file = files[0];
    if (!file) return;
  }

  const onSubmit = async (data: z.infer<typeof addProductFormSchema>) => {
    console.log(files);
    try {
      if (files.length) {
        const { data: ProductImageAdded, error: ImageError } =
          await supabase.storage
            .from("Products")
            .upload(
              `public/ProductImages-${Date.now().toString()}-${files[0].name}`,
              files[0]
            );
        if (ImageError) {
          throw ImageError;
        }
        if (ProductImageAdded) {
          console.log(ProductImageAdded);
          toast.success("Product Image Added");
        }
        const { data: ProductAdded, error } = await supabase
          .from("products")
          .insert([
            {
              id: uuidv4(),
              name: data.name,
              price: 0,
              description: data.description,
              imageURL: ProductImageAdded.path,
            },
          ]);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Product Added as: " + data.name);
          console.log(ProductAdded);
        }
      } else {
        toast.error("Please select an image");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full justify-between flex flex-col md:flex-row items-center mb-5 ">
      <h1 className="text-3xl font-bold mb-5 text-left ">Products</h1>
      <Sheet>
        <SheetTrigger>
          <Button variant="default" size="sm" className="gap-2">
            <PlusCircle />
            Add Product
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[100%] lg:w-[50%] xl:w-[40%]">
          <SheetHeader>
            <SheetTitle>Creating new Products</SheetTitle>
            <SheetDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Name</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Product Name"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Description</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Product Description"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps({ onChange: field.onChange })}
                            {...field}
                          />
                          {files.length === 0 && (
                            <div className="w-full bg-slate-300/10 rounded-2xl relative h-[150px] flex justify-center items-center">
                              <div className="flex gap-4 justify-center items-center">
                                {isDragActive ? (
                                  <>
                                    <PlusSquare />
                                    <p>Drop Your Files here</p>
                                  </>
                                ) : (
                                  <>
                                    <Plus />
                                    <p>Upload Files</p>
                                  </>
                                )}
                              </div>
                              <div className="absolute bottom-3 w-full text-center text-sm">
                                <span>Upload Single image at a time </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {files.length && (
                          <section className="mt-10">
                            <p>{form.formState.errors.image?.message}</p>
                            <p>Added files</p>
                            <ul className="flex flex-col space-y-7 w-full mt-2 text-sm  text-accent-foreground overflow-y-auto h-80 overflow-auto ">
                              {files.map((file) => (
                                <li
                                  key={file.name}
                                  className="flex flex-col relative justify-between items-center p-2 bg-secondary-foreground rounded-md"
                                >
                                  <Image
                                    src={URL.createObjectURL(file)}
                                    alt="product image"
                                    width={100}
                                    height={100}
                                    className="w-full h-full"
                                  />
                                  <p className="text-xs font-light text-muted-foreground justify-start text-left truncate ">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() => removeFile(file.name)}
                                    className="absolute -top-0 right-0 text-red-500"
                                  >
                                    <XCircle />
                                  </button>
                                </li>
                              ))}
                            </ul>
                            {files.length && (
                              <Button
                                variant={"destructive"}
                                onClick={() => removeAll()}
                                className="w-full "
                              >
                                Remove all
                              </Button>
                            )}
                          </section>
                        )}
                      </FormItem>
                    )}
                  />

                  <Button
                    variant={"btn-primary"}
                    type="submit"
                    className="w-full flex gap-2"
                  >
                    {form.formState.isSubmitting ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <>
                        <PlusCircle />
                        Add Product
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductsNav;
