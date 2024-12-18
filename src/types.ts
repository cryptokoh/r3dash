import { Dispatch, SetStateAction, ComponentType, RefObject } from 'react'

export type IconProps = {
  className?: string
  size?: string | number
}

export type IconComponent = ComponentType<IconProps>

export interface Shortcut {
  id: string
  name: string
  icon: IconComponent
  url: string
  category: string
  type: 'shortcut'
}

export interface DescribedShortcut extends Shortcut {}

export type Theme = 'purple' | 'green' | 'teal'

export interface CommonLink {
  id: string
  name: string
  icon: IconComponent
  url: string
  description: string
  category: string
  type: 'link'
}

export interface DescribedLink extends CommonLink {}

export interface NetworkLink extends CommonLink {
  chainId?: string
  currency?: string
}

export type Link = DescribedLink | NetworkLink

export type CitiesToTimeZones = {
  [key: string]: string[]
}

export type LensPublicationStats = {
  reactions: number
}

export type LensImageMetadataV3 = {
  __typename: 'ImageMetadataV3'
  id: string
  content: string
  asset: {
    image: {
      optimized: {
        uri: string
      }
    }
  }
}

export type LensTextOnlyMetadataV3 = {
  __typename: 'TextOnlyMetadataV3'
  content: string
}

export type LensPostMetadata = LensImageMetadataV3 | LensTextOnlyMetadataV3

export type LensPublication = {
  stats: LensPublicationStats
  metadata: LensPostMetadata
}

export type LensExplorePublicationsResponse = {
  items: LensPublication[];
}

export type TimerUpdateHandler = (isRunning: boolean, timeLeft: number) => void

export interface ModalsState {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>
  openModal: (modalKey: keyof ModalsState['isOpen']) => void
  closeModal: (modalKey: keyof ModalsState['isOpen']) => void
  toggleModal: (modalKey: keyof ModalsState['isOpen']) => void
  toggleTheme: () => void
  onTimerUpdate: TimerUpdateHandler
  timerTimeLeft: number
  setTimerTimeLeft: Dispatch<SetStateAction<number>>
  isTimerRunning: boolean
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  isOpen: {
    isWClockOpen: boolean
    isSocialOpen: boolean
    isWalletsOpen: boolean
    isLexiconOpen: boolean
    isMusicOpen: boolean
    isHelpOpen: boolean
    isModalvateOpen: boolean
    isPricesOpen: boolean
    isGovOpen: boolean
    isDocsOpen: boolean
    isLensOpen: boolean
    isGameBOpen: boolean
    isIpfsOpen: boolean
    isDefiOpen: boolean
    isRefiOpen: boolean
    isNetworksOpen: boolean
    isPomodoroOpen: boolean
  };
  startTimer: () => void
  onEscape: () => void // Add onEscape prop
}

export interface ModalsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  openModal: (modalKey: keyof ModalsProps['isOpen']) => void
  closeModal: (modalKey: keyof ModalsProps['isOpen']) => void
  toggleModal: (modalKey: keyof ModalsProps['isOpen']) => void
  toggleTheme: () => void
  onTimerUpdate: TimerUpdateHandler
  timerTimeLeft: number
  setTimerTimeLeft: Dispatch<SetStateAction<number>>
  isTimerRunning: boolean
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  isOpen: ModalsState['isOpen']
  startTimer: () => void
  onEscape: () => void // Add onEscape prop
}

export interface KeyboardEventHandlers {
  onCtrlK?: () => void
  onCtrlB?: () => void
  onEscape?: () => void
  onAltT?: () => void
  onAltM?: () => void
  onAltH?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
}

export interface ToolbarProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  showToolbar: boolean
  toggleToolbar: () => void;
  openModal: (modalKey: keyof ModalsProps['isOpen']) => void
  closeModal: (modalKey: keyof ModalsProps['isOpen']) => void
  toggleModal: (modalKey: keyof ModalsProps['isOpen']) => void
  toggleTheme: () => void
  isOpen: ModalsProps['isOpen']
  timerTimeLeft: number
  setTimerTimeLeft: (timeLeft: number) => void
  isTimerRunning: boolean
  setIsTimerRunning: (isRunning: boolean) => void
  toolbarRef: RefObject<HTMLDivElement>
}

export interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

export interface WClockProps extends CommonModalProps {}

export interface SocialProps extends CommonModalProps {}

export interface MusicProps extends CommonModalProps {
  onOpen: () => void
}

export interface LexiconProps extends CommonModalProps {}

export type PomodoroProps = {
  isOpen: boolean;
  onClose: () => void
  theme: Theme
  onTimerUpdate: TimerUpdateHandler
  timerTimeLeft: number
  setTimerTimeLeft: Dispatch<SetStateAction<number>>
  isTimerRunning: boolean
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  startTimer: () => void
}

export interface WalletsProps extends CommonModalProps {}

export interface PricesProps extends CommonModalProps {}

export interface GovProps extends CommonModalProps {}

export interface LensProps extends CommonModalProps {}

export interface IPFSProps extends CommonModalProps {}

export interface GameBProps extends CommonModalProps {}

export interface DefiProps extends CommonModalProps {}

export interface RefiProps extends CommonModalProps {}

export interface NetworksProps extends CommonModalProps {}

export interface ModalvateProps extends CommonModalProps {}

export interface HelpProps extends CommonModalProps {}

export interface DocsProps extends CommonModalProps {}

export type ModalProps =
  | WClockProps
  | SocialProps
  | MusicProps
  | LexiconProps
  | PomodoroProps
  | WalletsProps
  | PricesProps
  | GovProps
  | LensProps
  | IPFSProps
  | GameBProps
  | DefiProps
  | RefiProps
  | NetworksProps
  | ModalvateProps
  | HelpProps
  | DocsProps