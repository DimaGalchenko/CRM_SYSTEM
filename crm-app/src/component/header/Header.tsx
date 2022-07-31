import React from 'react'
import {AppBar, Button, Grid, Menu, MenuItem} from '@mui/material'
import { Typography } from '@mui/material'
import './Header.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'


function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const isAuthenticated = false

    return (
        <div>
            <AppBar position='relative' color='secondary' >
                <Grid container >
                    <Grid className={'left-nav-items'} item xs={2} >
                        <Typography
                            className={'logo'}
                            variant='h6'
                            noWrap
                            color={'primary'}
                            align={'center'}
                        >
                            CRM SYSTEM
                        </Typography>
                    </Grid>
                    { isAuthenticated ? <Grid className={'left-nav-items'} item xs={6}>
                        <Button color='primary' variant='text'
                            id='organization-button'
                            aria-controls={open ? 'organization-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon/>}
                        >
                            Organization
                        </Button>
                        <Menu
                            id='organization-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'organization-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Org 1</MenuItem>
                            <MenuItem onClick={handleClose}>Org 2</MenuItem>
                            <MenuItem onClick={handleClose}>Org 3</MenuItem>
                        </Menu>
                        <Button color='primary' variant='text'
                                id='recent-button'
                                aria-controls={open ? 'recent-menu' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon/>}
                        >
                            RECENT
                        </Button>
                        <Menu
                            id='recent-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'recent-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Org 1</MenuItem>
                            <MenuItem onClick={handleClose}>Org 2</MenuItem>
                            <MenuItem onClick={handleClose}>Org 3</MenuItem>
                        </Menu>
                    </Grid> : null}
                </Grid>


            </AppBar>
        </div>
    )
}

export default Header