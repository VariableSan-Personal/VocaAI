import httpService from '@/app/axios.config'

export const fetchGreetingMessages = () => {
  return httpService.get('/greetings')
}

export const submitFileUpload = (formData: FormData) => {
  return httpService.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
