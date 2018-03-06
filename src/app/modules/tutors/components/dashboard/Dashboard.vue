<template>
	<div class="tools">
    <div class="tool" 
		  	v-for="(item, index) in tools">
			<h2>
				<img class="icon" :src="item.icon" />
				{{ item.name }}
			</h2>
			<div class="btn-hld">
        <router-link :to="item.path"><regular-button name=">>"></regular-button></router-link>
        </div>
			<p class="overview">{{ item.overview }}</p>
      <div class="btn-hld">
        <regular-button class="right" name="View All >>"></regular-button>
        </div>
		</div>
	</div>
</template>

<script>
import RegularButton from '@/modules/base/buttons/Button'
import DashboardToolsService from '@/services/dashboard/DashboardToolsService'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      tools: []
    }
  },
  computed: {
    ...mapGetters({
      accountId: 'Authenticate/accountsId'
    })
  },
  methods: {
    select (event, index) {
      this.addPath({ name: this.tools[index].name, position: 3 })
    },
    ...mapActions({
      addPath: 'NavigationStore/addPath'
    }),
    async loadTools () {
      try {
        const response = await DashboardToolsService.gatTools()
        if (response && response.data && response.status === 200) {
          this.onLoad(response.data.tools)
        }
        console.log('response.data ', response.data)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    onLoad (tools) {
      this.tools = tools
    }
  },
  components: {
    RegularButton
  },
  created: function () {
    this.loadTools()
    console.log('in dashboard create ')
  }
}
</script>

<style lang="less" scoped>
.btn-hld {
    margin: 0rem auto;
     padding: .5rem 0rem;
  }
</style>
