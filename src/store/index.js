import Vuex from 'vuex';

import mines from "./modules/mines.js";
import game from "./modules/game.js";

export default new Vuex.Store({
  modules: {
    mines,
    game
  }
})