import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import config from "../../../config/config";

const TinyMce = ({ value, onChange }) => {
  const getHeight = () => {
    if (typeof window === "undefined") return 500;
    if (window.innerWidth < 640) return 300;
    if (window.innerWidth < 1024) return 450;
    return window.innerHeight - 260;
  };

  return (
    <Editor
      value={value}
      apiKey={config.appwriteTpyeMceKey}
      init={{
        height: getHeight(),
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code fullscreen",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        resize: false, // user manual resize band
      }}
      onEditorChange={onChange}
    />
  );
};

export default TinyMce;
