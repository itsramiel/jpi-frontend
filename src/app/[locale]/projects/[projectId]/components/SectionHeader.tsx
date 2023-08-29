import { IconType } from "react-icons";

interface SectionHeaderProps {
  Icon: IconType;
  title: string;
}
export function SectionHeader({ Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Icon size={24} color="#374151" className="mirror" />
      <p className="text-gray-900 text-2xl font-semibold">{title}</p>
    </div>
  );
}
