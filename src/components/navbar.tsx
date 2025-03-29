import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Icon, Menu, MenuItem } from '@mui/material'
import { Text, Link } from './index'
import '../style.css'
import { useLocation } from 'react-router-dom'

type NavbarProps = {
  startInvisible?: boolean
  darkMode?: boolean
}

// https://mui.com/material-ui/react-menu/

const Navbar = (props: NavbarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const location = useLocation()
  const [isSticky, setIsSticky] = useState(false)
  const [isInvis, setIsInvis] = useState(false)
  const [currPath, setCurrPath] = useState(location.pathname)

  useEffect(() => {
    setCurrPath(location.pathname)
    makeSticky()
  }, [location, setCurrPath])

  const makeSticky = () => {
    if (location.pathname == '/') {
      if (window.scrollY >= 20) {
        if (!isSticky) {
          setIsInvis(false)
        }
        setIsSticky(true)
      } else {
        if (isSticky) {
          setIsInvis(true)
        }
        setIsSticky(false)
      }
    } else {
      setIsSticky(true)
      setIsInvis(false)
    }
  }
  window.addEventListener('scroll', makeSticky)

  const startInvis = props.startInvisible ? ' nav-home' : ''
  const isScreenSmall = useMediaQuery({ maxWidth: '1150px' })
  const navColor = props.darkMode ? 'nav-dark-mode' : 'nav-light-mode'
  const navClasses = `nav${startInvis}${isSticky ? ' nav-sticky' : ''}${isInvis ? ' nav-invisible' : ''} ${navColor}`
  if (isScreenSmall) {
    return (
      <nav className={navClasses}>
        <div>
          <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
            <MenuItem>
              <Link to="/explore" type="nav-menu" selected={currPath === '/explore'}>
                <Text font="display" size="xxs" slot="label" weight="medium">
                  Explore Recipes
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/create" type="nav-menu" selected={currPath === '/create'}>
                <Text font="display" size="xxs" slot="label" weight="medium">
                  Create a Recipe
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/howtouse" type="nav-menu" selected={currPath === '/howtouse'}>
                <Text font="display" size="xxs" slot="label" weight="medium">
                  How to Use
                </Text>
              </Link>
            </MenuItem>
          </Menu>
        </div>
        <Link to="/" type="nav-title">
          <Text font="display" size="md">
            nourristar
          </Text>
        </Link>
      </nav>
    )
  } else {
    return (
      <nav className={navClasses}>
        <Link to="/" type="nav-title">
          <Text font="display" size="md">
            nourristar
          </Text>
        </Link>
        <div className="nav-list">
          <Link to="/howtouse" type="nav" selected={currPath === '/howtouse'}>
            <Text font="display" size="xs" weight="medium">
              How to Use
            </Text>
          </Link>
          <Link to="/create" type="nav" selected={currPath === '/create'}>
            <Text font="display" size="xs" weight="medium">
              Create a Recipe
            </Text>
          </Link>
          <Link to="/explore" type="nav" selected={currPath === '/explore'}>
            <Text font="display" size="xs" weight="medium">
              Explore Recipes
            </Text>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Navbar
