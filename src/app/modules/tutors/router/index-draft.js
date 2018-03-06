import Tutors from '@/modules/tutors/components/Tutors'
import TutorsHome from '@/modules/tutors/components/TutorsHome'
import Quizzes from '@/modules/tutors/components/dashboard/quizzes/quiz/Quizzes'
import QuizDashboard from '@/modules/tutors/components/dashboard/quizzes/QuizDashboardViews/QuizDashboard'
import Assessments from '@/modules/tutors/components/dashboard/assessments/Assesments'
import Workplace from '@/modules/tutors/components/dashboard/workplace/Workplace'
import Exams from '@/modules/tutors/components/dashboard/exams/Exams'
import Courses from '@/modules/tutors/components/dashboard/courses/Courses'
import Dashboard from '@/modules/tutors/components/dashboard/dashboardView/Dashboard'

/* Common components */
const BoardHeader = () => import('@/modules/tutors/components/quizzes/common/BoardHeader')
const Toolbar = () => import('@/modules/tutors/components/quizzes/common/Toolbar')
const WorkingArea = () => import('@/modules/tutors/components/quizzes/common/WorkingArea')

const QuizList = () => import('@/modules/tutors/components/quizzes/quiz/QuizList')

const QuestionsOverview = () => import('@/modules/tutors/components/quizzes/quiz/QuestionsOverview')
const QuizAbout = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/QuizAbout')
const QuizCreate = () => import('@/modules/tutors/components/quizzes/quiz/Create')
const QuizSettings = () => import('@/modules/tutors/components/quizzes/quiz/Settings')

const Questions = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/QuestionList')
const Settings = () => import('@/modules/tutors/components/quizzes/quizDashboardViews/Settings')

const def = {
  header: BoardHeader,
  toolbar: Toolbar,
  board: WorkingArea
}

export default [
  {
    path: '/tutors/:id',
    component: Tutors,
    children: [
      {
        path: '',
        redirect: { name: 'Dashboard' },
        name: 'TutorsHome',
        component: TutorsHome
      },
      {
        path: 'quiz-list',
        redirect: { path: 'quiz-list/list' },
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
                path: 'questionsoverview',
                name: 'QuestionsOverview',
                component: QuestionsOverview
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
        path: 'quizz-dashboard/:qid',
        redirect: { path: 'quizz-dashboard/:qid/about' },
        name: 'QuizDashboard',
        component: QuizDashboard,
        children: [
          {
            path: '',
            components: def,
            children: [
              {
                path: 'about',
                name: 'About',
                component: QuizAbout
              },
              {
                path: 'questions',
                name: 'Questions',
                component: Questions
              },
              {
                path: 'settings',
                name: 'Settings',
                component: Settings
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
        path: 'workplace',
        name: 'Workplace',
        component: Workplace
      },
      {
        path: 'exams',
        name: 'Exams',
        component: Exams
      },
      {
        path: 'courses',
        name: 'Courses',
        component: Courses
      },
      {
        path: 'tools',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  }
]
