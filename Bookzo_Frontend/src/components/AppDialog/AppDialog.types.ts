import { ReactNode } from 'react';

/**
 * Props for the AppDialog component.
 */
export interface AppDialogProps {
    /**
     * open state for the dialog
     */
    open: boolean;

    /**
     * close handler for the dialog
     */
    onClose: () => void;

    /**
     * Title used in the dialog
     */
    title: string;

    /**
     * Dialog Content
     */
    content: ReactNode;

    /**
     * Dialog actions
     */
    actions: ReactNode;
}
