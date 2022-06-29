import { object, string, optional, boolean, TypeOf } from "zod";

export const inputListSchema = object({
  name: string({
    required_error: "Name is required",
  }),
  desc: optional(string()),
  active: optional(boolean()),
}).strict();

export const createListSchema = object({
  body: inputListSchema,
  params: object({
    siteId: string(),
  }),
});

export const updateListSchema = object({
  body: inputListSchema,
  params: object({
    listId: string(),
  }),
});

export type InputListSchema = TypeOf<typeof inputListSchema>;
export type CreateListSchema = TypeOf<typeof createListSchema>;
export type UpdateListSchema = TypeOf<typeof updateListSchema>;
