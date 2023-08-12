interface TextAreaInputProps extends React.HTMLProps<HTMLTextAreaElement> {
  title: string;
}

export const TextAreaInput = ({ title, ...props }: TextAreaInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-800 font-semibold">{title}</p>
      <textarea
        {...props}
        className="py-3 px-2 rounded-lg border border-gray-400 h-36 resize-none"
      />
    </div>
  );
};
