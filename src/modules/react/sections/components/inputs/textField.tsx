import { Input } from "@mm/components/ui/input";
import { Label } from "@mm/components/ui/label";
import { InputHTMLAttributes } from "react";

interface TextFieldProps {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  placeholder: string;
}

export function TextField({ label, placeholder, type }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}
