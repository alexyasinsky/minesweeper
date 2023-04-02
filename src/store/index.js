import Vuex from 'vuex';

import game from './modules/game.js';
import cells from './modules/cells';

export default new Vuex.Store({
  modules: {
    game,
    cells
  }
})