import Tutors from '@/modules/tutors/components/Tutors'
import Quizzes from '@/modules/tutors/components/quizzes/quiz/Quizzes'
import Assessments from '@/modules/tutors/components/assessments/Assesments'
import Workspace from '@/modules/tutors/components/workspace/Workspace'
import Exams from '@/modules/tutors/components/exams/Exams'
import Cources from '@/modules/tutors/components/cources/Cources'
import Dashboard from '@/modules/tutors/components/dashboard/Dashboard'

const BoardHeader = () => import('@/modules/tutors/components/quizzes/common/BoardHeader')
const Toolbar = () => import('@/modules/tutors/components/quizzes/common/Toolbar')
const WorkingArea = () => import('@/modules/tutors/components/quizzes/common/WorkingArea')

const Question = () => import('@/modules/tutors/components/quizzes/questions/Question')
const QuestionOverview = () => import('@/modules/tutors/components/quizzes/questions/QuestionOverview')
const Questions = () => import('@/modules/tutors/components/quizzes/questions/Questions')
const ImportQuestions = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/ImportQuestions')
const ExportQuestions = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/ExportQuestions')
const QuestionList = () => import('@/modules/tutors/components/quizzes/questions/QuestionList')
const QuizList = () => import('@/modules/tutors/components/quizzes/quiz/QuizList')
const QuizCreate = () => import('@/modules/tutors/components/quizzes/quiz/Create')
const QuizSettings = () => import('@/modules/tutors/components/quizzes/quiz/Settings')
const Quiz = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/Quiz')
const QuizAbout = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/QuizAbout')

const def = {
  header: BoardHeader,
  toolbar: Toolbar,
  board: WorkingArea
}

export default [
  {
    path: '/tutors',
    component: Tutors,
    children: [
      {
        path: '', redirect: 'tools'
      },
      {
        path: 'tools',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'quiz',
        name: 'Quiz',
        component: Quiz,
        children: [
          {
            path: '',
            components: def,
            children: [
              {
                path: 'quiz-about',
                name: 'QuizAbout',
                props: true,
                component: QuizAbout
              },
              {
                path: 'settings',
                name: 'QuizSettings',
                props: true,
                component: QuizSettings
              },
              {
                path: 'import-questions',
                name: 'ImportQuestions',
                component: ImportQuestions
              },
              {
                path: 'export-questions',
                name: 'ExportQuestions',
                component: ExportQuestions
              }
            ]
          }
        ]
      },
      {
        path: 'questions',
        name: 'Questions',
        component: Questions,
        children: [
          {
            path: '',
            components: def,
            children: [
              {
                path: 'questions-list',
                name: 'QuestionsList',
                component: QuestionList
              },
              {
                path: 'question-overview',
                name: 'QuestionOverview',
                component: QuestionOverview
              },
              {
                path: 'create-question',
                name: 'CreateQuestions',
                component: Question
              },
              {
                path: 'edit-delete-question',
                name: 'EditQuestion',
                component: Question
              }
            ]
          }
        ]
      },
      {
        path: 'quizzes',
        name: 'Quizzes',
        component: Quizzes,
        children: [
          {
            path: '',
            components: def,
            children: [
              {
                path: 'list',
                name: 'QuizList',
                component: QuizList
              },
              {
                path: 'create',
                name: 'QuizCreate',
                component: QuizCreate
              },
              {
                path: 'settings',
                name: 'QuizSettings',
                props: true,
                component: QuizSettings
              }
            ]
          }
        ]
      },
      {
        path: 'assesments',
        name: 'Assessments',
        component: Assessments
      },
      {
        path: 'workspace',
        name: 'Workspace',
        component: Workspace
      },
      {
        path: 'exams',
        name: 'Exams',
        component: Exams
      },
      {
        path: 'cources',
        name: 'Cources',
        component: Cources
      }
    ]
  }
]
