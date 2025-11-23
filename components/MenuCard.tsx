import type { MenuItem } from '@/lib/types';
import { getAllergenNames } from '@/lib/allergens';

interface MenuCardProps {
  item: MenuItem;
  showPrice?: boolean;
}

export default function MenuCard({ item, showPrice = true }: MenuCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">{item.name}</h3>
        {showPrice && item.price && (
          <span className="text-xl font-bold text-amber-600 whitespace-nowrap">{item.price.toFixed(2)} €</span>
        )}
      </div>
      
      {item.description && (
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
      )}
      
      {item.allergens && item.allergens.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-2">Alergény:</p>
          <div className="flex flex-wrap gap-1">
            {item.allergens.map((allergen) => (
              <span
                key={allergen}
                className="inline-block bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded"
                title={getAllergenNames([allergen])[0]}
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
