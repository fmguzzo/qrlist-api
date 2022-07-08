import * as z from "zod";

export const inputItemSchema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    desc: z.string({
      required_error: "Description is required",
    }),
    price: z.number({
      required_error: "Description is required",
    }),
  })
  .strict();

export const optionaltemSchema = z.object({
  name: z.optional(z.string()),
  desc: z.optional(z.string()),
  price: z.optional(z.number()),
});

/**
 * itemId is empty --> don't rute path
 */

export const updateItemSchema = z.object({
  body: optionaltemSchema,
  params: z.object({
    itemId: z.string(),
  }),
});

/**
 * categoryId is empty --> don't rute path
 */

export const createItemSchema = z.object({
  body: inputItemSchema,
  params: z.object({
    categoryId: z.string(),
  }),
});

export const findItemSchema = z.object({
  params: z.object({
    categoryId: z.string(),
  }),
  query: z.object({
    page: z.string({
      required_error: "Page is required",
    }),
    items: z.string({
      required_error: "Items is required",
    }),
  }),
});

export const deleteItemSchema = z.object({
  params: z.object({
    itemId: z.string(),
  }),
  query: z.object({
    categoryId: z.string({
      required_error: "CategoryId is required",
    }),
  }),
});

export type CreateItemSchema = z.TypeOf<typeof createItemSchema>;
export type UpdateItemSchema = z.TypeOf<typeof updateItemSchema>;
export type DeleteItemSchema = z.TypeOf<typeof deleteItemSchema>;
export type FindItemSchema = z.TypeOf<typeof findItemSchema>;
