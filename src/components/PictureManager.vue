<template>
  <div class="picture-manager">
    <div class="cards" v-if="pictures.length > 0">
      <el-card
        class="picture-item-card"
        v-for="item in pictures"
        :key="item.name"
        shadow="never"
        body-class="picture-item-card-body"
      >
        <template #header>{{ item.name }}</template>
        <img class="picture-thumbnail" :src="item.url" alt="item.name" width="30px" />
        <template #footer>
          <span class="picture-size"> {{ item.width }} x {{ item.height }} </span>
          <el-icon class="delete-button" @click="removeImage(item.name)"><Delete /></el-icon>
        </template>
      </el-card>
      <div class="picture-item-card upload-card" @click="uploadPicture">
        <el-icon size="60"><Plus /></el-icon>
        <div>Add Picture</div>
        <!-- <el-button type="primary" @click="uploadImage">Add Picture</el-button> -->
      </div>
    </div>
    <div v-else>
      <el-empty :image-size="100" description="No pictures">
        <el-button type="primary" @click="uploadPicture">Upload Picture</el-button>
      </el-empty>
    </div>
  </div>
  <input
    ref="fileInput"
    type="file"
    accept="image/*"
    multiple="true"
    style="display: none"
    @change="handleFileChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type PictureData = {
  name: string
  url: string
  image: HTMLImageElement
  width: number
  height: number
}

const pictures = ref([] as PictureData[])
const fileInput = ref<HTMLInputElement>()

function uploadPicture() {
  fileInput.value?.click()
}

function removeImage(name: string) {
  const index = pictures.value.findIndex((item) => item.name === name)
  if (index !== -1) {
    pictures.value.splice(index, 1)
  }
  emit('picture-change')
}

function handleFileChange() {
  if (!fileInput.value) {
    return
  }
  const files = fileInput.value.files
  if (!files) {
    return
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      const image = new Image()
      image.onload = () => {
        pictures.value.push({
          name: file.name,
          url,
          image,
          width: image.width,
          height: image.height,
        })
        emit('picture-change')
      }
      image.src = url
    }
    reader.readAsDataURL(file)
  }
}

function getPictures() {
  const result = pictures.value.map((item) => {
    return {
      name: item.name,
      url: item.url,
    }
  })
  return result
}

function setPictures(data: { name: string; url: string }[]) {
  pictures.value = []
  data.forEach((item) => {
    const image = new Image()
    const result = {
      name: item.name,
      url: item.url,
      image,
      width: image.width,
      height: image.height,
    }
    image.onload = () => {
      result.width = image.width
      result.height = image.height
      pictures.value.push(result)
      emit('picture-change')
    }
    image.src = item.url
  })
}

type EmitType = {
  (event: 'picture-change'): void
}

const emit = defineEmits<EmitType>()

defineExpose({
  getPictures,
  setPictures,
})
</script>

<style scoped>
.picture-manager {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  /* justify-content: center; */
}

.picture-item-card {
  /* width: 150px; */
  height: 250px;
  /* margin: 10px; */
}

.upload-card {
  width: 150px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed #ccc;
  flex-direction: column;
  border-radius: 10px;
  color: #ccc;
}

.upload-card:hover {
  /* background-color: #f9f9f9; */
  color: #409eff;
  border-color: #409eff;
  transition: all 0.3s;
}

.picture-thumbnail {
  /* margin: 10px; */
  /* object-fit: contain; */
  width: 100%;
  max-width: 150px;
  height: 150px;
  max-height: 100px;
  object-fit: contain;
  /* display: block; */
}

.picture-size {
  margin-right: 10px;
}

.delete-button {
  cursor: pointer;
  color: #ff4d4f;
  float: right;
  position: relative;
  top: 2px;
}
</style>
<style lang="scss">
$pattern-size: 6px;
$pattern-offset: 3px;
$pattern-color: #f3f3f3;
$pattern-color: #ddd;

.picture-item-card-body {
  /* background-color: #ddd; */
  text-align: center;
  background-image:
    linear-gradient(45deg, $pattern-color 25%, transparent 25%, transparent 75%, $pattern-color 75%),
    linear-gradient(45deg, $pattern-color 25%, transparent 25%, transparent 75%, $pattern-color 75%); 
  background-position:
    0 0,
    $pattern-offset $pattern-offset;
  background-size: $pattern-size $pattern-size; /* 棋盘格单元大小 */
}
</style>
