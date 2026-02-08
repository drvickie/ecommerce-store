import { z } from "zod"

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
