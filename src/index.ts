import Scene from './components/Scene'
import './scss/styles.scss'
import { sceneConfig } from './config'

const game = new Scene(sceneConfig)
game.init()
