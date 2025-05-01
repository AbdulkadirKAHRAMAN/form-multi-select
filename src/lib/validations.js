import { z } from "zod";

export const step1Schema = z.object({
  name: z
    .string()
    .nonempty({ message: "İsim alanı boş bırakılamaz" })
    .min(2, { message: "İsim en az 2 karakter olmalıdır" }),

  email: z
    .string()
    .nonempty({ message: "E-posta alanı boş bırakılamaz" })
    .email({ message: "Geçerli bir e-posta adresi girin" }),

  phone: z
    .string()
    .nonempty({ message: "Telefon numarası boş bırakılamaz" })
    .min(10, { message: "Telefon numarası en az 10 karakter olmalıdır" }),

  city: z
    .string()
    .nonempty({ message: "Lütfen bir şehir seçiniz" }),

  birthDate: z
    .string()
    .nonempty({ message: "Doğum tarihi boş bırakılamaz" })
    .refine((val) => {
      const date = new Date(val);
      const currentYear = new Date().getFullYear();
      const year = date.getFullYear();
      return year >= 1900 && year <= currentYear;
    }, { message: "Geçerli bir doğum tarihi giriniz." }),
});

export const step2Schema = z.object({
    educationStatus: z.string().min(1, { message: "öğrenim durumu boş  bırakılamaz" }),
    courseSelection: z.string().min(1, { message: "Ders seçimi zorunludur" }),
    acceptance: z
    .array(z.string())
    .min(1, { message: "En az bir seçenek seçilmelidir." })
})
export const step3Schema = z.object({
    certificateCompetency: z.string().min(1, { message: "öğrenim durumu boş  bırakılamaz" }),
    expectations: z
    .array(z.string())
    .min(1, { message: "En az bir seçenek seçilmelidir." }),
    career: z
    .array(z.string())
    .min(1, { message: "En az bir seçenek seçilmelidir." }),
})

