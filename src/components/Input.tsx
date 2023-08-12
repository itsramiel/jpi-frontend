interface InputProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
}

export const Input = ({ title, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-800 font-semibold">{title}</p>
      <input
        {...props}
        className="py-3 px-2 rounded-lg border border-gray-400"
      />
    </div>
  );
};
