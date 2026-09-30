/**
 * Props for the CitySelectionModal component.
 */
export interface CitySelectionModalProps {
    /**
     * Controls modal visibility externally.
     * If not provided, modal uses internal state.
     */
    externalOpen?: boolean;

    /**
     * Callback triggered when the modal is closed.
     */
    onClose?: () => void;
}
