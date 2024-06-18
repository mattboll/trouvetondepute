<template>
  <div id="app">
    <Tinder
      ref="tinder"
      key-name="id"
      v-model:queue="queue"
      :max="1"
      :offset-y="10"
      allow-down
      @submit="onSubmit"
    >
      <template #default="{ data }">
        <div
          class="pic"
          :style="{
            'background-image': `url(https://cn.bing.com//th?id=OHR.${data.img}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
          }"
        />
      </template>
      <template #like>
        <div class="like-pointer" slot="like">👍</div>
      </template>
      <template #nope>
        <div class="nope-pointer" slot="nope">❌</div>
      </template>
      <template #super>
        <div class="super-pointer" slot="super">👍</div>
      </template>
      <template #down>
        <div class="down-pointer" slot="down">🤷</div>
      </template>
      <template #rewind>
        <div class="rewind-pointer" slot="rewind">◀</div>
      </template>
    </Tinder>
  </div>
  <div class="flex justify-center items-center mt-3">
    <div class="d-flex content-center items-center">
      <span class="mx-2 btn" @click="decide('nope')">❌</span>
      <span class="mx-2 btn" @click="decide('down')">🤷</span>
      <span class="mx-2 btn" @click="decide('like')">👍</span>
    </div>
  </div>
</template>

<script setup>
import Tinder from 'vue-tinder'
import source from './bing'
import 'vue-tinder/lib/style.css'
import { ref, onMounted } from 'vue'


onMounted(() => {
    mock()
})

  const emits = defineEmits(['onSubmit'])
    const queue= ref([]);
    const offset= ref(0);
const history = ref([]);
    function mock(count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: i,  img: source[offset.value] })
        offset.value++
      }
      if (append) {
        queue.value = queue.value.concat(list)
      } else {
        queue.value.unshift(...list)
      }
    }
    function onSubmit(data) {
      emits("onSubmit", data)
      history.value.push(data.item)
    }
    function decide(choice) {
      if (choice === 'rewind') {
        if (history.value.length) {
          $refs.tinder.rewind(
            history.value.splice(history.value.length-1)
          )
        }
      } else {
        $refs.tinder.decide(choice)
      }
    }
</script>

<style scoped>

#app {
  width: 100%;
  height: 100%;
}
#app .vue-tinder {
  margin: auto;
  min-width: 300px;
  min-height: 300px;
  width: 300px;
  height: 300px;
  top: 0;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  font-size: 48px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer,
.down-pointer {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 48px;
}

.super-pointer {
  bottom: 40px;
}

.down-pointer {
  top: 40px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btn {
  font-size: 36px;
}

</style>