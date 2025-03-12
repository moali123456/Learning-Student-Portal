import { Controller, useFormContext } from "react-hook-form";
interface FormControllerProps {
  name: string;
  type?: "text" | "radio" | "textarea";
  options?: {
    value: string;
    label: string;
    style?: { text?: string; peer?: string };
  }[];
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormController({
  name,
  type = "text",
  options,
  placeholder,
  className,
  onChange = () => {},
}: FormControllerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${className} mb-4`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === "radio" && options) {
            return (
              <div className="space-y-2">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className={"flex items-center space-x-2 cursor-pointer"}
                  >
                    <input
                      type="radio"
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                      className="hidden peer "
                      onChange={(e) => {
                        field.onChange(e.target.value); // Update form state
                        onChange(e); // Call external onChange
                      }}
                    />
                    <span
                      className={
                        "w-4 h-4 border border-gray-400 rounded-full " +
                        `${option.style?.peer}`
                      }
                    ></span>
                    <span
                      className={`${option?.style?.text || "text-gray-700 "}`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            );
          } else if (type === "textarea") {
            return (
              <textarea
                {...field}
                rows={5}
                className={`w-full h-40 resize-none p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[name] && "border-red-600 focus:ring-neutral-50"
                }`}
                placeholder={placeholder}
                onChange={(e) => {
                  field.onChange(e);
                  onChange(e);
                }}
              />
            );
          } else {
            return (
              <input
                {...field}
                type={type}
                className="border rounded p-2 w-full"
                placeholder={placeholder}
              />
            );
          }
        }}
      />
      {/* <p className="text-red-500 min-h-8">
        {errors[name] ? (errors[name]?.message as string) : ""}
      </p> */}
    </div>
  );
}
