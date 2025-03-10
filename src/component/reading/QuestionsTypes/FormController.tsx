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
}

export default function FormController({
  name,
  type = "text",
  options,
  placeholder,
  className,
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
                    className={
                      "flex items-center space-x-2 cursor-pointer text-gray-700 " +
                      `${option?.style?.text}`
                    }
                  >
                    <input
                      type="radio"
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                      className="hidden peer"
                    />
                    <span
                      className={
                        "w-4 h-4 border border-gray-400 rounded-full " +
                        `${option.style?.peer}`
                      }
                    ></span>
                    <span className="font-medium ">{option.label}</span>
                  </label>
                ))}
              </div>
            );
          } else if (type === "textarea") {
            return (
              <textarea
                {...field}
                rows={5}
                className="w-full h-40 resize-none p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
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
      {errors[name] && (
        <p className="text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
