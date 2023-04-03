import { computed } from 'vue'
import { useStore } from 'vuex'

const mapState = (namespace) => {
  const store = useStore()
  const regexp = new RegExp(`${namespace}/`, 'i');
  return Object.fromEntries(
    Object.keys(store.state).map(
      key => [key.replace(regexp, ''), computed(() => store.state[key])]
    )
  )
}
const mapGetters = (namespace) => {
  const store = useStore()
  const regexp = new RegExp(`${namespace}/`, 'i');
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter.replace(regexp, ''), computed(() => store.getters[getter])]
    )
  )
}
const mapMutations = (namespace) => {
  const store = useStore();
  const regexp = new RegExp(`${namespace}/`, 'i');
  return Object.fromEntries(
    Object.keys(store._mutations).map(mutation => [mutation.replace(regexp, ''), value => store.commit(mutation, value)])
  )
}
const mapActions = (namespace) => {
  const store = useStore();
  const regexp = new RegExp(`${namespace}/`, 'i');
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => [action.replace(regexp, ''), value => store.dispatch(action, value)]
    )
  )
}
export { mapState, mapGetters, mapMutations, mapActions }