import { useEffect, useState } from 'react';

import {
    Box as MuiBox,
    Button as MuiButton,
    ButtonBase,
    Stack as MuiStack,
    TextField as MuiTextField,
    Typography as MuiTypography,
} from '@mui/material';

import DefaultAvatar from '@assets/images/default-avatar.webp';
import { Avatar } from '@components';
import { useUser } from '@hooks';
import { useUpdateUserMutation } from '@services';
import { getErrorMessage } from '@utils';
/**
 * Displays and edits user profile details.
 */
export const UserProfileForm = () => {
    const { user, imageUrl, refetch } = useUser();

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        profile_picture: null as string | null,
    });

    const [initialData, setInitialData] = useState(formData);

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    /**
     * Sync user data to form state
     */
    useEffect(() => {
        if (user) {
            const userData = {
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                profile_picture: user.profile_picture || null,
            };

            setFormData(userData);
            setInitialData(userData);
        }
    }, [user]);

    /**
     * Cleanup preview image to avoid memory leaks
     */
    useEffect(
        () => () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        },
        [previewImage],
    );

    /**
     * Handles input changes
     */
    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /**
     * Reset form to original user data
     */
    const handleCancel = () => {
        setFormData(initialData);
        setPreviewImage(null);
        setSelectedFile(null);
        setIsEditing(false);
    };

    /**
     * Check if form has changes
     */
    const isChanged =
        formData.first_name !== initialData.first_name ||
        formData.last_name !== initialData.last_name ||
        formData.phone_number !== initialData.phone_number ||
        selectedFile !== null;

    /**
     * Save profile changes using API
     */
    const handleSave = async () => {
        if (!isChanged) return;

        try {
            const formDataToSend = new FormData();

            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('phone_number', formData.phone_number);

            if (selectedFile) {
                formDataToSend.append('profile_picture', selectedFile);
            }

            await updateUser(formDataToSend).unwrap();

            await refetch();

            alert('Profile updated');

            setIsEditing(false);
            setSelectedFile(null);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    };

    /**
     * Handle image upload and preview
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);

            const preview = URL.createObjectURL(file);
            setPreviewImage(preview);
        }
    };

    return (
        <MuiStack gap={3} maxWidth={900} width="100%">
            {/* Profile Header */}
            <MuiStack direction="row" alignItems="center" gap={3}>
                <MuiBox position="relative">
                    <ButtonBase component="label">
                        <Avatar
                            src={previewImage || imageUrl || DefaultAvatar}
                            sx={{
                                width: 80,
                                height: 80,
                                cursor: isEditing ? 'pointer' : 'default',
                            }}
                        />

                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        )}
                    </ButtonBase>
                </MuiBox>

                <MuiTypography variant="h5" fontWeight="bold">
                    {formData.first_name} {formData.last_name}
                </MuiTypography>
            </MuiStack>

            {/* Account Details */}
            <MuiBox>
                <MuiTypography fontWeight="bold">Account Details</MuiTypography>

                <MuiStack
                    direction={{ xs: 'column', md: 'row' }}
                    gap={3}
                    mt={2}
                >
                    <MuiTextField
                        label="Mobile Number"
                        value={formData.phone_number}
                        disabled={!isEditing}
                        fullWidth
                        onChange={(e) =>
                            handleChange('phone_number', e.target.value)
                        }
                    />

                    <MuiTextField
                        label="Email Address"
                        value={formData.email}
                        disabled
                        fullWidth
                        required
                    />
                </MuiStack>
            </MuiBox>

            {/* Personal Details */}
            <MuiBox>
                <MuiTypography fontWeight="bold">
                    Personal Details
                </MuiTypography>

                <MuiStack
                    direction={{ xs: 'column', md: 'row' }}
                    gap={3}
                    mt={2}
                >
                    <MuiTextField
                        label="First Name"
                        value={formData.first_name}
                        disabled={!isEditing}
                        fullWidth
                        required
                        onChange={(e) =>
                            handleChange('first_name', e.target.value)
                        }
                    />

                    <MuiTextField
                        label="Last Name"
                        value={formData.last_name}
                        disabled={!isEditing}
                        fullWidth
                        onChange={(e) =>
                            handleChange('last_name', e.target.value)
                        }
                    />
                </MuiStack>
            </MuiBox>

            {/* Buttons */}
            {!isEditing ? (
                <MuiStack direction="row">
                    <MuiButton
                        onClick={() => setIsEditing(true)}
                        variant="contained"
                    >
                        Edit
                    </MuiButton>
                </MuiStack>
            ) : (
                <MuiStack direction="row" gap={2}>
                    <MuiButton
                        variant="contained"
                        onClick={() => {
                            void handleSave();
                        }}
                        disabled={!isChanged || isUpdating}
                    >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                    </MuiButton>

                    <MuiButton onClick={handleCancel}>Cancel</MuiButton>
                </MuiStack>
            )}
        </MuiStack>
    );
};
