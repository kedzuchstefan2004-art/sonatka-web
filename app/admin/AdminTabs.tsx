'use client';

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminTabs({ activeTab, setActiveTab }: AdminTabsProps) {
  const tabs = [
    { id: 'daily', label: 'Denné menu' },
    { id: 'permanent', label: 'Stála ponuka' },
    { id: 'reservations', label: 'Rezervácie' },
    { id: 'announcements', label: 'Aktuality' }
  ];

  return (
    <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'border-b-2 border-amber-600 text-amber-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
