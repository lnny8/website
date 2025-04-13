 //@ts-nocheck
 // Close all menus in the correct order
 const closeAllMenus = () => {
  if (!buttonTimeline.current || !menuTimeline.current) return

  // If sub-sub-menu is open, close it first
  if (activeSubTabIndex !== null && subSubMenuTimeline.current) {
    subSubMenuTimeline.current.reverse().then(() => {
      setActiveSubTabIndex(null)
      // Then if sub-menu is open, close it
      if (activeTabIndex !== null && subMenuTimeline.current) {
        subMenuTimeline.current.reverse().then(() => {
          setActiveTabIndex(null)
          buttonTimeline.current?.reverse()
          menuTimeline.current?.timeScale(1.5).reverse()
          setMenuOpen(false)
        })
      } else {
        buttonTimeline.current?.reverse()
        menuTimeline.current?.timeScale(1.5).reverse()
        setMenuOpen(false)
      }
    })
  }
  // If only sub-menu is open, close it
  else if (activeTabIndex !== null && subMenuTimeline.current) {
    subMenuTimeline.current.reverse().then(() => {
      setActiveTabIndex(null)
      buttonTimeline.current?.reverse()
      menuTimeline.current?.timeScale(1.5).reverse()
      setMenuOpen(false)
    })
  }
  // Otherwise just close the main menu
  else {
    buttonTimeline.current.reverse()
    menuTimeline.current.timeScale(1.5).reverse()
    setMenuOpen(false)
  }
}