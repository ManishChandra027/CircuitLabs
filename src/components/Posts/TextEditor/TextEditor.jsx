import React from "react";
import { useForm, Controller } from "react-hook-form";
import TinyMce from "./TinyMce";

const TextEditor = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TinyMce value={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  );
};

export default TextEditor;
