import { object, string, optional, TypeOf } from "zod";

export const fieldSiteSchema = object({
  body: object({
    business: optional(string()),
    siteAddress: optional(
      object({
        address: optional(string()),
        city: optional(string()),
        postalCode: optional(string()),
      })
    ),
    phone: optional(string()),
    email: optional(string().email("Not a valid email")),
  }).strict(),
});

export type FieldSiteSchema = TypeOf<typeof fieldSiteSchema>["body"];
