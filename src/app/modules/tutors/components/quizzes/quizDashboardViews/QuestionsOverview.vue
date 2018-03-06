<template>
  <div>
    QuestionsOverview {{count}}
  </div>
</template>
<script>
import {Observable} from 'rxjs-es/Observable'
import 'rxjs-es/add/observable/interval'
export default {
  name: 'QuestionsOverview',
  data: function () {
    return {
      count: 0
    }
  },
  created: function () {
    const obs = Observable.interval(1000)
    obs.subscribe(
        (value) => {
          this.count = value
        }
      )
  }
}
</script>

<style scoped lang="less">
  
</style>
