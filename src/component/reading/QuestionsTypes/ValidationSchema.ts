import { z, ZodTypeAny } from "zod";

const generateSchema = () => {
  return z.object({
    topics: z.array(
      z.object({
        topicId: z.string(),
        questions: z.array(
          z.object({
            questionId: z.string(),
            answer: z.union([
              z.string().min(1, "This field is required"), // For text answers
              z.array(z.string()).min(1, "At least one answer is required"), // For multiple choice
            ]),
          })
        ),
      })
    ),
  });
};

export const Schema = generateSchema();
export const inferZodSchema = (data: any): ZodTypeAny => {
  if (typeof data === "string") return z.string();
  if (typeof data === "number") return z.number();
  if (typeof data === "boolean") return z.boolean();
  if (Array.isArray(data))
    return data.length > 0
      ? z.array(inferZodSchema(data[0]))
      : z.array(z.any());
  if (typeof data === "object" && data !== null) {
    const shape: Record<string, ZodTypeAny> = {};
    Object.keys(data).forEach(
      (key) => (shape[key] = inferZodSchema(data[key]))
    );
   
    return z.object(shape);
  }
  return z.any();
};
