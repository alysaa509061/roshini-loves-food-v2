import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snacks", label: "Snacks" },
  { value: "desserts", label: "Desserts" },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat.value)}
          className="text-xs"
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

export { CATEGORIES };
