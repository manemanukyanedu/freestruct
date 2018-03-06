import LFCRUD from '@/services/local/localforageCrud'
import Quiz from '@/modules/tutors/classes/Quiz'
import Constants from '@/modules/tutors/api/constants'

self.onmessage = function (event) {
  console.log(event)
  switch (event.data.cmd) {
    case ('createStoreInstance'):
      createStore ()
      break
    case ('clearStoreInstance'):
      clearStore()
      break
    case ('saveElement'):
      save(event.data.val)
      break
    case ('updateElement'):
      test('updateElement')
      break
    case ('deleteElement'):
      test('deleteElement')
      break
    case ('getById'):
      test('getById')
      break
    case ('loadAll'):
      test('loadAll')
      break
  }
}
function test (t) {
  console.log('At last ' + t + ' is called')
}
function createStore () {
  self.quizDB = new LFCRUD(Constants.QUIZSTORENAME, Constants.QUIZESTOREPREFIX)
}
function clearStore () {
  self.quizDB.clearStoreInstance()
}
function save (quiz) {
  self.quizDB.save(quiz)
}
function update (id, quiz) {
  // self.quizDB.save(quiz)
}
function deleteQuiz (id) {
  // self.quizDB.save(quiz)
}