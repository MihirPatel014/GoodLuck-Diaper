export interface CategorySidebarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function CategorySidebar({
  categories,
  activeCategory,
  onSelectCategory,
  className = '',
}: CategorySidebarProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* "All Products" Option */}
      <button
        type="button"
        onClick={() => onSelectCategory('All')}
        className={`w-full text-left uppercase text-xs tracking-wider font-bold py-3.5 px-6 rounded-xl transition-colors transition-transform duration-200 cursor-pointer ${
          activeCategory.toLowerCase() === 'all'
            ? 'bg-[#00A86B] text-white shadow-md shadow-emerald-500/20 translate-x-1'
            : 'bg-[#EBF2EE] text-slate-700 hover:bg-[#E2EDE6] hover:text-slate-900'
        }`}
      >
        All Categories
      </button>

      {/* Dynamic categories from products.json */}
      {categories.map((category) => {
        const isActive = activeCategory.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left uppercase text-xs tracking-wider font-bold py-3.5 px-6 rounded-xl transition-colors transition-transform duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#00A86B] text-white shadow-md shadow-emerald-500/20 translate-x-1'
                : 'bg-[#EBF2EE] text-slate-700 hover:bg-[#E2EDE6] hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
