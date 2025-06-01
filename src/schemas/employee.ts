import { z } from "zod";
import { nameValidation } from "@/schemas/helper";

export const employeeSchema = z.object({
  employee_full_name: nameValidation,
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;