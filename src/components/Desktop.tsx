import React, { useState, useRef, useEffect, useCallback } from 'react'
import SearchBar from './SearchBar'
import { fetchShortcutsAndLinks } from '../utils/filtering'
import useModals from '../hooks/useModals'
import useKeyboardEvents from '../hooks/useKeyboardEvents'
import { searchTerms } from '../config'
import { CommonLink, KeyboardEventHandlers, Shortcut, ModalsState } from '../types'
import Toolbar from './Toolbar'
import Modals from './Modals'
import CombinedGrid from './CombinedGrid'
import { Heart, Info, Book } from 'lucide-react'
import TimerDisplay from './TimerDisplay'

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showToolbar, setShowToolbar] = useState(false)
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(true) // Track focus state

  const modals: ModalsState = useModals('purple')

  const searchInputRef = useRef<HTMLInputElement>(null)
  const combinedGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null) // Ensure searchBarRef is defined

  const [, setItems] = useState<(Shortcut | CommonLink)[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShortcutsAndLinks()
      setItems(data)
    }

    fetchData()
  }, [])

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900',
  }

  const toggleToolbar = () => {
    if (isSearchBarFocused) {
      setShowToolbar(true)
      setIsSearchBarFocused(false)
      toolbarRef.current?.focus()
    } else {
      setShowToolbar(false)
      setIsSearchBarFocused(true)
      searchInputRef.current?.focus()
    }
  }

  const navigateToSearchBar = () => {
    searchInputRef.current?.focus()
    setIsSearchBarFocused(true)
  }

  const navigateToGrid = () => {
    if (combinedGridRef.current && combinedGridRef.current.gridItemsRef.current) {
      const firstItem = combinedGridRef.current.gridItemsRef.current[0]
      if (firstItem) {
        firstItem.focus()
        setIsSearchBarFocused(false)
      }
    }
  }

  const openModalvate = () => {
    modals.toggleModal('isModalvateOpen')
  }

  const openHelpModal = () => {
    modals.toggleModal('isHelpOpen')
  }

  const openLexiconModal = () => {
    modals.toggleModal('isLexiconOpen')
  }

  const handleOpenMusicModal = () => {
    modals.toggleModal('isMusicOpen')
  }

  const onEscape = useCallback(() => {
    const modalKeys = Object.keys(modals.isOpen) as (keyof ModalsState['isOpen'])[]
    let hasOpenModal = false

    modalKeys.forEach(key => {
      if (key.startsWith('is') && key.endsWith('Open') && modals.isOpen[key]) {
        modals.closeModal(key)
        hasOpenModal = true
      }
    })

    // Focus the search bar if any modal was closed
    if (hasOpenModal) {
      navigateToSearchBar()
    }
  }, [modals, navigateToSearchBar])

  const keyboardEventHandlers: KeyboardEventHandlers = {
    onCtrlK: () => {
      searchInputRef.current?.focus()
      setIsSearchBarFocused(true)
    },
    onCtrlB: toggleToolbar,
    onEscape,
    onAltT: modals.toggleTheme,
    onAltM: handleOpenMusicModal,
    onAltH: () => modals.toggleModal('isHelpOpen'),
  }

  const getKeyboardEventHandlers = useCallback(
    () => keyboardEventHandlers,
    [keyboardEventHandlers]
  )

  useKeyboardEvents(getKeyboardEventHandlers, searchInputRef)

  useEffect(() => {
    const lowerSearch = search.toLowerCase()
    const matchedTerm = Object.keys(searchTerms).find(term => lowerSearch.includes(term))

    if (matchedTerm) {
      const modalOrAction = searchTerms[matchedTerm as keyof typeof searchTerms]
      modals.openModal(modalOrAction)
      setSearch('')
    }
  }, [search, modals.openModal])

  useEffect(() => {
    searchInputRef.current?.focus()
    setIsSearchBarFocused(true)
  }, [])

  return (
    <div
      className={`relative min-h-screen ${themeClasses[modals.theme]} text-white overflow-hidden p-8`}
    >
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchInputRef={searchInputRef}
        theme={modals.theme}
        onNavigateToGrid={navigateToGrid}
        onFocus={() => setIsSearchBarFocused(true)}
      />
      <div className="absolute md:top-6 md:right-1/4 lg:right-1/5 xl:right-1/6 md:flex hidden justify-center md:mt-0 lg:mt-2 z-50 space-x-2">
        <button
          onClick={openHelpModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Info size={24} />
        </button>
        <button
          onClick={openLexiconModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Book size={24} />
        </button>
      </div>

      {/* Mobile version of the Info and Book buttons */}
      <div className="md:hidden flex justify-center mt-2">
        <button
          onClick={openHelpModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Info size={24} />
        </button>
        <button
          onClick={openLexiconModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Book size={24} />
        </button>
      </div>

      <button
        onClick={openModalvate}
        className="absolute bottom-6 left-4 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity z-50"
      >
        <Heart size={24} />
      </button>

      <CombinedGrid
        ref={combinedGridRef}
        theme={modals.theme}
        search={search}
        onNavigateToSearchBar={navigateToSearchBar}
        searchBarRef={searchBarRef}
      />

      <TimerDisplay
        isTimerRunning={modals.isTimerRunning}
        timerTimeLeft={modals.timerTimeLeft}
        onClick={() => modals.toggleModal('isPomodoroOpen')}
      />

      <Toolbar
        theme={modals.theme}
        setTheme={modals.setTheme}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        openModal={modals.openModal}
        closeModal={modals.closeModal}
        toggleModal={modals.toggleModal}
        toggleTheme={modals.toggleTheme}
        isOpen={modals.isOpen}
        timerTimeLeft={modals.timerTimeLeft}
        setTimerTimeLeft={modals.setTimerTimeLeft}
        isTimerRunning={modals.isTimerRunning}
        setIsTimerRunning={modals.setIsTimerRunning}
        toolbarRef={toolbarRef} // Pass toolbarRef to Toolbar
      />

      <Modals
        theme={modals.theme}
        setTheme={modals.setTheme}
        openModal={modals.openModal}
        closeModal={modals.closeModal}
        toggleModal={modals.toggleModal}
        toggleTheme={modals.toggleTheme}
        onTimerUpdate={modals.onTimerUpdate}
        timerTimeLeft={modals.timerTimeLeft}
        setTimerTimeLeft={modals.setTimerTimeLeft}
        isTimerRunning={modals.isTimerRunning}
        setIsTimerRunning={modals.setIsTimerRunning}
        isOpen={modals.isOpen}
        startTimer={modals.startTimer}
        onEscape={onEscape} // Pass onEscape handler to Modals
      />
    </div>
  )
}

export default Desktop