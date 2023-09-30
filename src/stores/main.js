import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://alquran-api-production.up.railway.app'

export const useMainStore = defineStore('main', {
  state: () => ({
    modalData: {},
    surah: {},
    details: {},
    idDetail: 0,
    sounds: {},
    mark: 0,
    infoMark: {}
  }),
  actions: {
    async login(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/user/login`, input)

        localStorage.access_token = data.access_token
        this.isLogin = true
        this.router.push('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async register(input) {
      try {
        await axios.post(`${baseUrl}/user/register`, input)

        this.router.push('/login')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Register Success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async modal() {
      try {
        const { data } = await axios.get(`${baseUrl}/bot`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.modalData = data
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async fetchSurah() {
      try {
        const { data } = await axios.get(`${baseUrl}/quran`, { headers: { access_token: localStorage.access_token } })
        this.surah = data.chapters
        localStorage.detailId = data.chapters
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async fetchDetail(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/quran/${id}`, { headers: { access_token: localStorage.access_token } })
        this.details = data.verses
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async fetchSound(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/quran/sounds/${id}`, { headers: { access_token: localStorage.access_token } })
        this.sounds = data.audio_file
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async addMark(id) {
      try {
        await axios.post(`${baseUrl}/quran/read/${id}`, id, { headers: { access_token: localStorage.access_token } })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Add Mark Success',
          showConfirmButton: false,
          timer: 1500
        })

        await this.getMark()
        await this.viewMark()
      } catch (err) {
        this.mark = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`
        })
      }
    },
    async getMark() {
      try {
        const { data } = await axios.get(`${baseUrl}/quran/mark`, { headers: { access_token: localStorage.access_token } })
        if (!data.data) return this.mark = 0
        this.mark = data.data.SurahId
      } catch (err) {
        console.log(err);
      }
    },
    async removeMark() {
      try {
        await axios.delete(`${baseUrl}/quran/read`, { headers: { access_token: localStorage.access_token } })
        this.mark = 0
        this.infoMark = 0
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Remove Mark Success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        console.log(err);
      }
    },
    async viewMark() {
      try {
        const { data } = await axios.get(`${baseUrl}/quran/surah`, { headers: { access_token: localStorage.access_token } })

        this.infoMark = data.chapter
      } catch (err) {
        console.log(err);
      }
    }
  }
})
