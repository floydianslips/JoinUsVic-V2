import React, { Component } from 'react'
import { Sidebar, Segment, Tab, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'

const DescriptionSidebar = ({ animation, visible, direction, hideDescription, panes, sidebarLoaded }) => {
  return (
    <Sidebar
      inverted='true'
      vertical='true'
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >

      <div className="sidebar-tab-menu">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        <a onClick={hideDescription} className="sidebar-hidethis">
          <Icon name="caret right" />
          HideThis
        </a>
      </div>
    </Sidebar>
  )
}

DescriptionSidebar.propTypes = {
  animation: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectorShowed: true,
      visible: false,
      animation: 'overlay',
      direction: 'right',
      anchorsIdsStr: '',
      locationsArray: [],
      averageRatingsArray: [],
      selectedAnchorId: null,
      selectedArray: [],
      panes: []
    }
    this.handleLocationSidebar = this.handleLocationSidebar.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
    this.getSelectedAnchorId = this.getSelectedAnchorId.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
  }

  // handle user clicking on location/building request, deals with animations
  handleLocationSidebar = (animation, direction, visible, locationsArray, hideDescription) => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !visible,
      panes: []
    })
    // puts all anchor correlated locations inside of the sidebar tab panes array, sets panes array state
    locationsArray.forEach((location) => {
      this.setState(state => {
        const location_info =
        {
          menuItem: {key: location.id, content:location.name},
          render: () =>
            <Tab.Pane attached={false}>
              <LocationDescription location={location} />
            </Tab.Pane>
        }
        const panes = [...state.panes, location_info]
        return {
          panes
        }
      })
    })
  }

  // hide sidebar on clicking 'hide this'
  hideDescription = () => {
    this.setState({
      selectorShowed: true,
      visible: false,
    })
  }

  // a callback that grabs responses from post request inside of main-selection component
  getLocationsOnKeywords = (anchors, locations, ratings) => {
    this.setState({
      anchorsIdsStr: anchors,
      locationsArray: locations,
      averageRatingsArray: ratings
    })
  }

  // gets the anchor id on click of 3d model anchor
  getSelectedAnchorId = (anchorId) => {
    let selected = []
    this.state.locationsArray.forEach(location => {
      if (location.anchor_id === Number(anchorId)) {
        selected.push(location)
      }
    })
    this.setState({
      selectedAnchorId: anchorId,
      selectedArray: selected
    })
    this.handleAnchorClick()
  }

  handleAnchorClick = () => {
    this.handleLocationSidebar('overlay', 'right', this.state.visible, this.state.selectedArray, this.hideDescription)
  }

  render() {
    const { sidebarLoaded, selectorShowed, visible, animation, direction,averageRatingsArray, panes, selectedArray } = this.state

    const { keywordsList, modelLoaded, callLoader} = this.props

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationsArray={selectedArray} hideDescription={this.hideDescription} panes={panes} sidebarLoaded={sidebarLoaded}/>
          <Sidebar.Pusher dimmed={visible}>
            <div className="main-model">
              <ThreeContainer modelLoaded={modelLoaded} getSelectedAnchorId={this.getSelectedAnchorId} />
              { selectorShowed && <MainSelection keywordsList={ keywordsList} getLocationsOnKeywords={this.getLocationsOnKeywords} callLoader={callLoader}/> }
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}