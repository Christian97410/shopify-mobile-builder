import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface BuilderPanelProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const BuilderPanel: React.FC<BuilderPanelProps> = ({ title, children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full w-80 bg-white border-l border-gray-200 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </motion.div>
  );
};

export default BuilderPanel;