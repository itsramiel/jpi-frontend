interface SectionItemsProps {
  items: Array<string>;
}

export function SectionItems({ items }: SectionItemsProps) {
  return (
    <ul className="list-disc list-inside ms-2 text-gray-700 text-base font-medium">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
