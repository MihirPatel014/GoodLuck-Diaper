export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  className = '',
}: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className={`overflow-x-auto no-scrollbar py-2 -mx-4 px-4 flex items-center gap-2 ${className}`}>
      {allCategories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors transition-shadow duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#00A86B] text-white shadow-sm'
                : 'bg-[#EBF2EE] text-slate-700 hover:bg-[#DEE9E2]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
