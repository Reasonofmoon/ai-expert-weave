import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  tab: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton = ({ tab, label, icon: Icon, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive ? 'nexus-tab-active' : 'nexus-tab-inactive'
      }`}
    >
      <Icon size={16} className="mr-2" />
      <span className="font-medium">{label}</span>
    </button>
  );
};