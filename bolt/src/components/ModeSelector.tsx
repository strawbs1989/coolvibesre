import React from 'react';
import { AssistantMode } from '../types';
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  LightBulbIcon,
  ComputerDesktopIcon,
  HomeIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';

interface ModeSelectorProps {
  currentMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  const modes = [
    { id: 'friend', icon: ChatBubbleLeftRightIcon, label: 'Best Friend' },
    { id: 'girlfriend', icon: HeartIcon, label: 'Girlfriend' },
    { id: 'tech', icon: CodeBracketIcon, label: 'Tech Support' },
    { id: 'apps', icon: DevicePhoneMobileIcon, label: 'App Builder' },
    { id: 'website', icon: GlobeAltIcon, label: 'Website Builder' },
    { id: 'computer', icon: ComputerDesktopIcon, label: 'Computer Help' },
    { id: 'ideas', icon: LightBulbIcon, label: 'Idea Generator' },
    { id: 'flyers', icon: SwatchIcon, label: 'Flyer Design' },
    { id: 'home', icon: HomeIcon, label: 'Smart Home' },
    { id: 'music', icon: MusicalNoteIcon, label: 'Music Finder' },
    { id: 'stories', icon: BookOpenIcon, label: 'Story Helper' },
    { id: 'blog', icon: DocumentTextIcon, label: 'Blog Helper' },
    { id: 'search', icon: MagnifyingGlassIcon, label: 'Info Finder' },
    { id: 'design', icon: PaintBrushIcon, label: 'Design Help' }
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100">
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onModeChange(id as AssistantMode)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentMode === id
              ? 'bg-blue-500 text-white scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-200 hover:scale-102'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};