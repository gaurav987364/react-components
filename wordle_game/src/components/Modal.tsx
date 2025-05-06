import React, { PropsWithChildren, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface DialogProps extends PropsWithChildren {
  onClose: () => void
};

const Modal: React.FC<DialogProps> = ({ onClose, children }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  const focusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = modalContentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (!focusableElements?.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') focusTrap(e);
    },
    [onClose, focusTrap]
  );

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
        <div 
      role="dialog"
      aria-modal="true"
      aria-label="Dialog-Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div 
        ref={modalContentRef}
        className="relative w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
      >
        <div className="p-6 text-neutral-50">
          {children}
        </div>
      </div>
    </div>
    ,
    document.body
  );
};

export default Modal;
