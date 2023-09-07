import { IoAlertOutline } from "react-icons/io5";

interface AlertMessageProps {
  children: string;
}
export const AlertMessage = ({ children }: AlertMessageProps) => {
  return (
    <div className="flex p-2 gap-2 rounded border border-red-600/60 bg-red-600/20">
      <IoAlertOutline size={18} color={"rgba(153, 27, 27, 1)"} />
      <p className="text-gray-900 text-sm font-semibold">{children}</p>
    </div>
  );
};
