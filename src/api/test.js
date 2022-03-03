import request from '@/utils/request'

export function upload(files) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }
  console.log(files)
  return request({
    url: '/project/upload_cover',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
