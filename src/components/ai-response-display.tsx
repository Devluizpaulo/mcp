
'use client';

import { CircuitBoard, Cpu, HardDrive, Keyboard, MemoryStick, Monitor, Mouse, Puzzle, Power, Fan, PcCase, CheckCircle, XCircle, Star, DollarSign, Zap } from 'lucide-react';
import React from 'react';

const iconMap: { [key: string]: React.ElementType } = {
  cpu: Cpu,
  processador: Cpu,
  gpu: Puzzle,
  'placa de vídeo': Puzzle,
  ram: MemoryStick,
  memória: MemoryStick,
  motherboard: CircuitBoard,
  'placa-mãe': CircuitBoard,
  armazenamento: HardDrive,
  storage: HardDrive,
  ssd: HardDrive,
  hd: HardDrive,
  psu: Power,
  fonte: Power,
  cooler: Fan,
  gabinete: PcCase,
  case: PcCase,
  monitor: Monitor,
  teclado: Keyboard,
  mouse: Mouse,
  compatibilidade: CheckCircle,
  compatibility: CheckCircle,
  pros: CheckCircle,
  cons: XCircle,
  contras: XCircle,
  características: Star,
  features: Star,
  preço: DollarSign,
  price: DollarSign,
  consumo: Zap,
  power: Zap,
};

const findIcon = (text: string): React.ElementType | null => {
    const lowerText = text.toLowerCase();
    // Check for exact matches first for higher priority keys
    const exactMatch = Object.keys(iconMap).find(key => lowerText === key);
    if (exactMatch) return iconMap[exactMatch];

    // Then check for includes
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
        <div className="space-y-3 text-sm leading-relaxed">
            {lines.map((line, index) => {
                const trimmedLine = line.trim();

                if ((trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) || (trimmedLine.startsWith('## '))) {
                    const title = trimmedLine.replace(/\*|#/g, '').trim();
                    const Icon = findIcon(title);
                    return (
                        <h3 key={index} className="text-lg font-semibold mt-6 mb-3 flex items-center gap-2 font-headline text-primary/90 border-b border-primary/20 pb-2">
                            {Icon && <Icon className="w-5 h-5 text-primary" />}
                            {title}
                        </h3>
                    );
                }

                if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                    return (
                        <div key={index} className="flex items-start gap-3">
                           <span className="text-accent mt-1">&#x25CF;</span>
                           <span className="flex-1">{trimmedLine.substring(2)}</span>
                        </div>
                    );
                }

                return <p key={index}>{line}</p>;
            })}
        </div>
    );
}
