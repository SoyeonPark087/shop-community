import { useEffect, useState } from 'react'


/*
  ==========================================
  MOODAY COMMUNITY FILTER
  Community Main v0.2.2
  STEP 4 — OPTIONAL FILTER MODULE
  ==========================================

  역할:

  - Community Main 우측 Filter UI
  - Filter Popover Open / Close
  - Post Type Draft 선택
  - Scene Draft 선택
  - Reset
  - Apply
  - ESC 닫기

  중요:

  이 컴포넌트는 Community Main 전체 데이터를
  직접 필터링하지 않습니다.

  CommunityFilter.jsx
  → 사용자가 선택한 Filter UI 관리

  Community.jsx
  → 실제 적용된 Filter State 관리
  → 실제 게시글 Filtering 관리

  이렇게 분리하여 추후 Filter 기능을 폐기하더라도
  STEP 1~3의 Tag / Sort / Load More 구조에
  영향을 최소화합니다.


  RESET 정책:

  일반 Option 선택:
  → Draft만 변경
  → Apply를 눌러야 실제 Grid에 반영

  Reset:
  → Draft를 All / All로 즉시 변경
  → 실제 Applied Filter도 즉시 All / All로 변경
  → Apply 불필요
  → Popover는 열린 상태 유지

  Main Tag는 Reset 대상이 아닙니다.
*/


/* =====================================
   01. FILTER OPTIONS
===================================== */

const POST_TYPE_OPTIONS = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'outfit',
    label: 'Outfit',
  },
  {
    value: 'detail',
    label: 'Detail',
  },
  {
    value: 'fit',
    label: 'Fit Check',
  },
  {
    value: 'daily',
    label: 'Daily',
  },
]


const SCENE_OPTIONS = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'indoor',
    label: 'Indoor',
  },
  {
    value: 'outdoor',
    label: 'Outdoor',
  },
  {
    value: 'mixed',
    label: 'Mixed',
  },
]


/* =====================================
   02. COMPONENT
===================================== */

export default function CommunityFilter({
  appliedPostType,
  appliedScene,
  onApply,
  onReset,
}) {

  /*
    Popover Open / Close 상태.

    Filter 버튼을 눌렀다고 해서
    실제 게시글 Filter가 즉시 변경되지는 않습니다.
  */

  const [isOpen, setIsOpen] = useState(false)


  /*
    Popover 내부에서 편집 중인 Draft 값.

    실제 Grid에 적용된 값과 분리합니다.
  */

  const [draftPostType, setDraftPostType] = useState(
    appliedPostType
  )

  const [draftScene, setDraftScene] = useState(
    appliedScene
  )


  /*
    실제 적용된 Advanced Filter가 하나라도 있으면
    Filter 버튼을 Active 상태로 표시합니다.
  */

  const isFilterActive =
    appliedPostType !== 'all'
    || appliedScene !== 'all'


  /* =================================
     03. OPEN / CLOSE
  ================================= */

  function handleFilterToggle() {

    /*
      이미 열려 있으면 닫습니다.

      Apply 없이 닫는 경우에는
      실제 Grid 상태를 변경하지 않습니다.
    */

    if (isOpen) {
      setIsOpen(false)
      return
    }


    /*
      Popover를 새로 열 때마다
      현재 실제 적용값을 Draft에 복사합니다.

      따라서 이전에 Apply하지 않고 닫았던
      임시 선택값은 다시 나타나지 않습니다.
    */

    setDraftPostType(appliedPostType)
    setDraftScene(appliedScene)

    setIsOpen(true)

  }


  /* =================================
     04. ESC CLOSE
  ================================= */

  useEffect(() => {

    if (!isOpen) {
      return undefined
    }


    function handleKeyDown(event) {

      if (event.key === 'Escape') {
        setIsOpen(false)
      }

    }


    document.addEventListener(
      'keydown',
      handleKeyDown
    )


    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }

  }, [isOpen])


  /* =================================
     05. RESET
  ================================= */

  function handleReset() {

    /*
      STEP 4 Reset 정책 변경.

      기존:
      Reset
      → Draft만 All / All
      → Apply를 눌러야 실제 Grid 초기화

      변경:
      Reset
      → Draft 즉시 All / All
      → 실제 Applied Filter도 즉시 All / All
      → Grid 즉시 갱신
      → Apply 불필요


      Main Tag는 Advanced Filter와
      독립 기능이므로 변경하지 않습니다.

      예:

      #knitwear
      + Outfit
      + Indoor

      Reset

      ↓

      #knitwear
      + All
      + All
    */

    setDraftPostType('all')
    setDraftScene('all')


    /*
      부모 Community.jsx에
      즉시 실제 Filter Reset을 요청합니다.

      Community.jsx에서는:

      - appliedPostType → all
      - appliedScene → all
      - Load More → 초기화

      를 처리합니다.
    */

    onReset()

    setIsOpen(false)
  }


  /* =================================
     06. APPLY
  ================================= */

  function handleApply() {

    /*
      일반 Filter Option 선택은
      Draft 상태에서만 변경됩니다.

      Apply를 눌렀을 때
      Community.jsx에 실제 적용값을 전달합니다.
    */

    onApply({
      postType: draftPostType,
      scene: draftScene,
    })


    /*
      Apply 이후 Popover를 닫습니다.
    */

    setIsOpen(false)

  }


  /* =================================
     07. RENDER
  ================================= */

  return (

    <div className="mooday-community-filter">

      {/* =================================
          FILTER TRIGGER
      ================================= */}

      <button
        type="button"
        className={
          `mooday-community__filter${
            isFilterActive
              ? ' mooday-community__filter--active'
              : ''
          }`
        }
        onClick={handleFilterToggle}
        aria-expanded={isOpen}
        aria-controls="community-filter-popover"
      >

        Filter

        <img
          className="mooday-community__filter-icon"
          src="/images/community/icons/filter.svg"
          alt=""
          aria-hidden="true"
        />

      </button>


      {/* =================================
          FILTER POPOVER
      ================================= */}

      {isOpen && (

        <div
          className="mooday-community-filter__popover"
          id="community-filter-popover"
          role="region"
          aria-label="커뮤니티 게시글 필터"
        >

          {/* =================================
              POST TYPE
          ================================= */}

          <div className="mooday-community-filter__group">

            <h3 className="mooday-community-filter__title">
              POST TYPE
            </h3>


            <div
              className="mooday-community-filter__options"
              aria-label="게시글 유형"
            >

              {POST_TYPE_OPTIONS.map((option) => {

                const isSelected =
                  draftPostType === option.value

                return (

                  <button
                    key={option.value}
                    type="button"
                    className={
                      `mooday-community-filter__option${
                        isSelected
                          ? ' mooday-community-filter__option--selected'
                          : ''
                      }`
                    }
                    onClick={() =>
                      setDraftPostType(option.value)
                    }
                    aria-pressed={isSelected}
                  >

                    {option.label}

                  </button>

                )

              })}

            </div>

          </div>


          {/* =================================
              SCENE
          ================================= */}

          <div className="mooday-community-filter__group">

            <h3 className="mooday-community-filter__title">
              SCENE
            </h3>


            <div
              className="mooday-community-filter__options"
              aria-label="촬영 장소 유형"
            >

              {SCENE_OPTIONS.map((option) => {

                const isSelected =
                  draftScene === option.value

                return (

                  <button
                    key={option.value}
                    type="button"
                    className={
                      `mooday-community-filter__option${
                        isSelected
                          ? ' mooday-community-filter__option--selected'
                          : ''
                      }`
                    }
                    onClick={() =>
                      setDraftScene(option.value)
                    }
                    aria-pressed={isSelected}
                  >

                    {option.label}

                  </button>

                )

              })}

            </div>

          </div>


          {/* =================================
              RESET / APPLY
          ================================= */}

          <div className="mooday-community-filter__actions">

            <button
              type="button"
              className="mooday-community-filter__reset"
              onClick={handleReset}
            >
              Reset
            </button>


            <button
              type="button"
              className="mooday-community-filter__apply"
              onClick={handleApply}
            >
              Apply
            </button>

          </div>

        </div>

      )}

    </div>

  )

}