import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button as MuiButton, Stack as MuiStack } from '@mui/material';

import logo from '@assets/images/logo.svg';
import { AvatarMenu, Image } from '@components';
import { PATHS } from '@constants';
import { RootState } from '@store';

import {
    CitySelectionWrapper,
    CityText,
    LogoWrapper,
    StyledAppBar,
} from './Header.styles';

/**
 * Header component displays the top navigation bar.
 * It includes logo navigation, city selection, and user actions.
 */
export const Header = ({ onCityClick }: { onCityClick: () => void }) => {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken,
    );
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    return (
        <StyledAppBar color="transparent">
            {/* Logo navigates to home page */}
            <Link to={PATHS.ROOT}>
                <LogoWrapper>
                    <Image src={logo} alt="logo" />
                </LogoWrapper>
            </Link>

            <MuiStack direction="row" gap={0.5} alignItems="center">
                {/* City selection trigger */}
                <CitySelectionWrapper onClick={onCityClick}>
                    <LocationOnIcon fontSize="small" color="success" />
                    <CityText variant="body2" noWrap>
                        {selectedCity?.name || 'Select city'}
                    </CityText>
                    <KeyboardArrowDownIcon fontSize="small" />
                </CitySelectionWrapper>

                {accessToken ? (
                    // show user menu if logged in
                    <AvatarMenu />
                ) : (
                    // show login button if not authenticated
                    <MuiButton
                        component={Link}
                        to={PATHS.LOGIN}
                        variant="contained"
                        color="error"
                    >
                        Login
                    </MuiButton>
                )}
            </MuiStack>
        </StyledAppBar>
    );
};
