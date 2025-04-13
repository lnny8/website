//@ts-nocheck
//    If sub-sub-menu is open, close it first
      if (activeSubTabIndex !== null && subSubMenuTimeline.current) {
        subSubMenuTimeline.current.reverse().then(() => {
          setActiveSubTabIndex(null)

        //   Then if sub-menu is open, close it
          if (activeTabIndex !== null && subMenuTimeline.current) {
            subMenuTimeline.current.reverse().then(() => {
              setActiveTabIndex(null)
              buttonTimeline.current?.reverse()
              menuTimeline.current?.timeScale(1.5).reverse()
            })
          } else {
            buttonTimeline.current?.reverse()
            menuTimeline.current?.timeScale(1.5).reverse()
          }
        })
      }
    //   If only sub-menu is open, close it
      else if (activeTabIndex !== null && subMenuTimeline.current) {
        subMenuTimeline.current.reverse().then(() => {
          setActiveTabIndex(null)
          buttonTimeline.current?.reverse()
          menuTimeline.current?.timeScale(1.5).reverse()
        })
      }
    //   Otherwise just close the main menu
      else {