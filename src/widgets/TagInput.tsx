import { Chip, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface ITagInputInfo {
    label: string
    placeholderText: string,
    currentTags?: string[]
    onChange?: (value: string[]) => void;
    isError?: boolean
}

export function TagInput({label, placeholderText, currentTags, onChange, isError} : ITagInputInfo)
{
  const [tags, setTags] = useState<string[]>(currentTags ?? []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (onChange)
      onChange(tags);
  }, [onChange, tags])

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <Box sx={{ border: "1px solid #ddd", p: 1, borderRadius: 1, width: "100%" }}>
      <TextField id="outlined-basic" label={label} variant="outlined" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (["Enter", ","].includes(e.key)) {
            e.preventDefault();
            addTag();
          }
        }}
        error={isError}
        onBlur={addTag}
        placeholder={placeholderText}
        fullWidth
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => setTags(tags.filter((t) => t !== tag))}
          />
        ))}
      </Box>
    </Box>
  );
};