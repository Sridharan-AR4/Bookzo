import {
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
} from '@mui/material';

import { AppDialogProps } from './AppDialog.types';

/**
 * Resusable Base Dialog component
 */
export const AppDialog = ({
    open,
    onClose,
    title,
    content,
    actions,
}: AppDialogProps) => (
    <MuiDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <MuiDialogTitle>{title}</MuiDialogTitle>

        <MuiDialogContent>{content}</MuiDialogContent>

        <MuiDialogActions>{actions}</MuiDialogActions>
    </MuiDialog>
);
