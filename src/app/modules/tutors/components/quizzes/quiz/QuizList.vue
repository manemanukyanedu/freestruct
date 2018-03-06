<template>
  <div>
    <div class="area-conntent">
        <table>
          <thead>
            <tr>
              <th v-for="th in tableHeaders">{{th}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tr, index) in quizList" v-on:click="select($event, index)">
              <td>{{tr.title}}</td>
              <td>{{tr.questionsCount}}</td>
              <td>{{tr.passingCount}}</td>
              <td>{{tr.usersCount}} </td>
              <td><i @click.stop="askForDelete($event, tr.id, tr.title, index)" class="material-icons">clear</i></td>
            </tr>
          </tbody>
        </table>
      </div>
      <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal" @close="cancelModal"></confirm-base>
  </div>
</template>
<script>
import QuizService from '@/services/quiz/QuizService'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QuizList',
  data () {
    return {
      modal: {
        name: 'Delete quiz',
        state: false,
        type: 'confirm',
        closeEvent: 'close',
        question: '',
        res: null,
        rej: null
      },
      boardHeader: {
        name: 'Quizzes',
        operation: {name: 'New', component: 'QuizCreate'}
      },
      tools: [
        {
          name: 'Quizzes',
          selected: true,
          component: 'QuizList',
          subToolbar: []
        },
        {
          name: 'New Quiz',
          selected: false,
          component: 'QuizCreate',
          subToolbar: []
        }
      ],
      tableHeaders: ['Title', 'Questions', 'Passed time', 'Passed users', 'xxx'],
      quizList: null
    }
  },
  computed: {
    ...mapGetters({
      accountsId: 'Authenticate/accountsId'
    })
  },
  methods: {
    select (event, index) {
      this.setQuizId(this.quizList[index].id)
      this.$router.push({name: 'Quiz'})
      console.log(this.$router.currentRoute.fullPath)
    },
    ...mapActions({
      addPath: 'NavigationStore/addPath',
      setQuizId: 'QuizzesStore/setQuizId',
      updateToolbar: 'QuizzesStore/updateToolbar',
      updateHeader: 'QuizzesStore/updateHeader'
    }),
    onLoad (quizzes) {
      this.quizList = quizzes
    },
    async loadQuizzes () {
      try {
        const response = await QuizService.index(this.accountsId)
        if (response && response.data && response.status === 200) {
          this.onLoad(response.data.quizzes)
        }
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    async askForDelete (e, id, title, index) {
      this.modal.question = title
      this.promise = new Promise((resolve, reject) => {
        this.modal.state = true
        this.modal.res = resolve
        this.modal.rej = reject
      })
      const answer = await this.promise
      if (answer) {
        this.deleteQuiz(id, index)
      }
    },
    async deleteQuiz (id, index) {
      try {
        const response = await QuizService.deleteQuiz({
          userId: this.accountsId,
          id: id
        })
        if (response.status === 200) {
          this.quizList.splice(index, 1)
        }
        console.log('response.data ', response)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    okModal () {
      this.modal.state = false
      this.modal.res(true)
    },
    cancelModal () {
      this.modal.state = false
      this.modal.res(false)
    }
  },
  created: function () {
    this.updateHeader(this.boardHeader)
    this.updateToolbar(this.tools)
  },
  mounted () {
    setTimeout(this.loadQuizzes, 100)
  },
  components: {
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase')
  }
}
</script>

<style scoped lang="less">
  
</style>
