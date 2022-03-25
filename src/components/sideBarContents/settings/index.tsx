import {Switch,Route} from 'react-router'
import {Routes} from'../../../routes'
import ColorTheme from'./pages/ColorTheme'
import MouseControls from'./pages/MouseControl'
import MouseControlEdit from './pages/MouseControlEdit'

export default function ApplicationSettings() {

  return (

    <Switch>

          <Route path={Routes.SETTINGS_THEME}>
            <ColorTheme/>
          </Route>
          <Route exact path={Routes.SETTINGS_MOUSE_CONTROLS}>
            <MouseControls/>
          </Route>
          <Route path={Routes.SETTINGS_MOUSE_CONTROLS_EDIT}>
              <MouseControlEdit/>
          </Route>

    </Switch>

  )
}