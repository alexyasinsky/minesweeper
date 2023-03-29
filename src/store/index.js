import Vuex from 'vuex';

import game from "./modules/game.js";
import cells from './modules/cells.js';

export default new Vuex.Store({
  modules: {
    cells,
    game
  }
})