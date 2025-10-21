
'use client';

import { CircuitBoard, Cpu, HardDrive, Keyboard, MemoryStick, Monitor, Mouse, Puzzle } from 'lucide-react';
import React from 'react';

const iconMap: { [key: string]: React.ElementType } = {
  cpu: Cpu,
  processador: Cpu,
  gpu: Puzzle,
  'placa de vídeo': Puzzle,
  ram: MemoryStick,
  memória: MemoryStick,
  'placa-mãe': CircuitBoard,
  motherboard: CircuitBoard,
  armazenamento: HardDrive,
  storage: HardDrive,
  ssd: HardDrive,
  hd: HardDrive,
  fonte: Puzzle,
  psu: Puzzle,
  gabinete: Puzzle,
  case: Puzzle,
  monitor: Monitor,
  teclado: Keyboard,
  mouse: Mouse,
};

const findIcon = (text: string): React.ElementType | null => {
    const lowerText = text.toLowerCase();
    for (const key in iconMap) {
        if (lowerText.includes(key)) {
            return iconMap[key];
        }
    }
    return null;
};

export function AiResponseDisplay({ content }: { content: string }) {
    const lines = content.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="space-y-2 text-sm leading-relaxed">
            {lines.map((line, index) => {
                const trimmedLine = line.trim();

                if ((trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) || (trimmedLine.startsWith('## '))) {
                    const title = trimmedLine.replace(/\*|#/g, '').trim();
                    const Icon = findIcon(title);
                    return (
                        <h3 key={index} className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2 font-headline text-primary/90">
                            {Icon && <Icon className="w-5 h-5 text-primary" />}
                            {title}
                        </h3>
                    );
                }

                if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                    return (
                        <p key={index} className="ml-4 flex items-start gap-2">
                           <span className="text-accent mt-1.5">•</span>
                           <span className="flex-1">{trimmedLine.substring(2)}</span>
                        </p>
                    );
                }

                return <p key={index}>{line}</p>;
            })}
        </div>
    );
}
