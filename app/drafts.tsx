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
    //   Otherwise just close the main 
    
    {/* Sub-page title */}
    {activeTabIndex !== null && <h2 className="text-4xl font-bold text-[#180c6c] mb-6">{menuData[activeTabIndex].name}</h2>}

      {/* Sub-sub-page title */}
      {activeTabIndex !== null && activeSubTabIndex !== null && "subsubPages" in menuData[activeTabIndex].subPages[activeSubTabIndex] && (
        <>
          <h2 className="text-4xl font-bold text-[#180c6c] mb-2">{menuData[activeTabIndex].name}</h2>
          <h3 className="text-3xl font-semibold text-[#180c6c] mb-6">{menuData[activeTabIndex].subPages[activeSubTabIndex].name}</h3>
        </>
      )}