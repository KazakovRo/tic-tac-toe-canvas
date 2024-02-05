import Scene from './components/Scene'
import './scss/styles.scss'
import { sceneConfig, themeConfig } from './config'

const game = new Scene(sceneConfig, themeConfig)
game.init()
