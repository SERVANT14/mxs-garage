import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Ecosystem from '@/components/ecosystem'
import TrackList from '@/components/track-list'
import TrackShow from '@/components/track-show'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/tracks', name: 'TrackList', component: TrackList},
    {path: '/tracks/:id', name: 'TrackShow', component: TrackShow},
    {path: '/ecosystem', name: 'Ecosystem', component: Ecosystem}
  ]
})
