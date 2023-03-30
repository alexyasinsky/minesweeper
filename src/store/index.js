import Vuex from 'vuex';

import game from './modules/game.js';

export default new Vuex.Store({
  modules: {
    game,
  }
})