const SERVER = 'http://localhost:7001'

export function getProjects() {
    return {
        type: 'GET_PROJECTS',
        payload: async () => {
            const response = await fetch(`${SERVER}/api/projects`)
            const data = await response.json()
            return data
        }
    }
}

