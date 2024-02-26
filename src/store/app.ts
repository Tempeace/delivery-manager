import { defineStore } from 'pinia'

export interface Request {
  type: string
  parcelType: string
  date: Date
  from: string
  to: string
  description: string
  userId: string
  creationDate: number
  associatedRequests: Request[]
}

export const useAppStore = defineStore('app', {
  state: () => ({
    requestsList: [] as Request[]
  }),
  actions: {
    addRequest (request: Request) {
      const savedRequests = localStorage.getItem('requests')
      if (savedRequests) {
        localStorage.setItem('requests', JSON.stringify([...JSON.parse(savedRequests), request]))
      } else {
        localStorage.setItem('requests', JSON.stringify([request]))
      }
    },
    fetchRequests (userId: string | null) {
      function sortByDate (array: Request[]) {
        array.sort((a, b) => {
          if (a.creationDate < b.creationDate) {
            return -1
          } else if (a.creationDate > b.creationDate) {
            return 1
          } else return 0
        }
        )
        return array
      }

      let requestsList = [] as Request[]
      const savedRequests = localStorage.getItem('requests')
      if (savedRequests) {
        requestsList = JSON.parse(savedRequests)
      } else {
        requestsList = []
      }

      if ((requestsList.length > 0) && userId) {
        requestsList = requestsList.filter((request) => request.userId === userId)
      }
      requestsList.forEach((request) => {
        request.associatedRequests = requestsList.filter((filteredRequest) =>
          request.userId !== filteredRequest.userId &&
          request.from === filteredRequest.from &&
          request.to === filteredRequest.to &&
          request.type === filteredRequest.type
        )
      })
      this.requestsList = sortByDate(requestsList)
    }
  }
})
