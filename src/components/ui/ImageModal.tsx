import { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Product } from '../../lib/products';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  triggerRef?: React.RefObject<HTMLImageElement | null>;
}

export function ImageModal({ isOpen, onClose, product, triggerRef }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setScale(prev => Math.min(Math.max(prev + e.deltaY * -0.001, 1), 5));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    setScale(prev => (prev > 1 ? 1 : 2));
    setPosition({ x: 0, y: 0 });
  };

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`View ${product.name} full size`}
    >
      <div
        className="absolute top-4 right-4 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetTransform}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Reset zoom"
        >
          {scale > 1 ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={modalRef}
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[90vh] object-contain transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            cursor: scale > 1 ? 'grab' : isDragging ? 'grabbing' : 'zoom-in',
          }}
        />
      </div>

      {scale > 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm pointer-events-none">
          Double-click to reset zoom • Scroll to zoom • Drag to pan
        </div>
      )}
    </div>
  );
}