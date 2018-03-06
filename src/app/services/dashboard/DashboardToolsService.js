import Api from '@/services/api'
export default {
  gatTools (credentials) {
    return Api().get('dashboardTool', credentials)
  }
}
