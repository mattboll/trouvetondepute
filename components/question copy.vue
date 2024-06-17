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
            'background-image': `url(https://cn.bing.com//th?id=OHR.${data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
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
      <span class="mx-2" @click="decide('nope')">❌</span>
      <span class="mx-2" @click="decide('down')">🤷</span>
      <span class="mx-2" @click="decide('like')">👍</span>
      <span class="mx-2" @click="decide('rewind')">◀</span>
    </div>
  </div>
</template>

<script>
import Tinder from 'vue-tinder'
import source from './bing'
import 'vue-tinder/lib/style.css'

export default {
  name: 'App',
  components: { Tinder },
  emits: ['onSubmit'],
  data: () => ({
    queue: [],
    offset: 0,
    history: []
  }),
  created() {
    this.mock()
  },
  methods: {
    mock(count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset] })
        this.offset++
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit(data) {
      emits("onSubmit", data)
      this.history.push(item)
    },
    async decide(choice) {
      if (choice === 'rewind') {
        if (this.history.length) {
          this.$refs.tinder.rewind(
            this.history.splice(this.history.length-1)
          )
        }
      } else {
        this.$refs.tinder.decide(choice)
      }
    }
  }
}
</script>

<style>

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

</style>