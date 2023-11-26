import { Fragment, useState } from 'react'
import clsx from 'clsx'
import QRCode from 'react-qr-code'
import { styled } from '@mui/material/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Toolbar,
  Drawer,
  Grid,
  Box,
  Typography,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  TextField,
  Button,
  Popover
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import { useStyles } from '../lib/useStyles'
import { theme } from '../lib/theme'

const CircleStatus = styled('span', {
  name: 'CircleStatus'
})(({ theme }) => ({
  width: '15px',
  height: '15px',
  borderRadius: '15px',
  margin: '0 10px'
  // ${(props) =>
  //   props.status
  //     ? `
  //   background: ${theme.palette.success.main};
  //   `
  //     : `
  //   background: ${theme.palette.error.main};
  //   `}
}))

export const Side = ({
  board,
  actual,
  setActual,
  plugins,
  addPage,
  deletePage,
  maxCol,
  maxRow,
  updateCol,
  updateRow,
  updateActualDeck
}) => {
  const classes = useStyles()
  const [tabIndex, setTabIndex] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  console.log('[SIDE] plugins are => ', plugins)

  return (
    <Grid className={clsx(classes.flex, classes.rootSide)}>
      <Grid className={clsx(classes.flex, classes.flexGrow, classes.flexEvenly)}>
        <Paper className={clsx(classes.flexGrow)}>
          <TabContext value={tabIndex}>
            {/* <AppBar position="static"> */}
            <TabList onChange={handleTabChange} aria-label="DeckPad Tabs">
              <Tab label="Pages" value="1" style={{ minWidth: 0, flex: 1 }} />
              <Tab label="ACtions" value="2" style={{ minWidth: 0, flex: 1 }} />
            </TabList>
            {/* </AppBar> */}
            <TabPanel value="1">
              <List>
                {board.map((page, index) => (
                  <ListItem button key={index} onClick={() => setActual(index)}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary={page.name} />
                  </ListItem>
                ))}
                <ListItem button key="add-page" onClick={() => addPage()}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={'New Page'} />
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel value="2">
              {Object.keys(plugins).map((plugin) => (
                <Accordion key={`plugin-${plugin}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${plugin}-content`}
                    id={`panel${plugin}-header`}
                  >
                    <Typography className={classes.heading}>{plugin}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="column">
                      {Object.keys(plugins[plugin]).map((action, i) => (
                        <Typography key={i} paragraph>
                          {action}
                        </Typography>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>
          </TabContext>
        </Paper>
      </Grid>
      {/* <Grid>
          <Paper>
            <Grid container direction={"column"} spacing={2}>
            <TextField
              id="page-name"
              label="Name"
              type="text"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              value={board[actual].name || ''}
              onChange={(e) => updateActualDeck({...board[actual], name: e.target.value})}
              // variant="filled"
            />

            <TextField
              style={{maxWidth: 100}}
              id="page-col"
              label="Columns"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={board[actual].col}
              onChange={(e) => updateCol(e.target.value >= maxCol ? maxCol : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />
            <TextField
              style={{maxWidth: 100}}
              id="page-row"
              label="Rows"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={board[actual].row}
              onChange={(e) => updateRow(e.target.value >= maxRow ? maxRow : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />

            <Button onClick={() => deletePage()}>
              <DeleteIcon />
            </Button>
            </Grid>
          </Paper>
        </Grid> */}
    </Grid>
  )
}
