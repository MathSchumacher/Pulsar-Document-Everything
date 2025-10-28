// src/shared/states/navbarState.ts
export type NavbarStateType = {
  donateMenu: {
    isOpen: boolean,
    isCopiedPix: boolean
  },
  mobileMenuIsOpen: boolean,
  selectedLocale: string | undefined
};

export const useNavbar = () => useState<NavbarStateType>('navbarState', () => ({
  donateMenu: {
    isOpen: false,
    isCopiedPix: false
  },
  mobileMenuIsOpen: false,
  selectedLocale: undefined
}));