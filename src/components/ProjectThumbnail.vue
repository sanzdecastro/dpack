<script>
import { ref } from "vue";
import { gsap } from "gsap";

export default {
  name: "ProjectThumbnail",
  props: {
    pageId: {
      type: Number,
    },
    key: {
      type: Number,
    },
    full: {
      type: Boolean,
    },
    thumbnail: {
      type: String,
    },
    projectData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      //projects: this.section && this.section.projects ? this.section.projects : []
    };
  },
  mounted() {
    console.log("Project Data:", this.projectData);
  },
  methods: {},
};
</script>

<template>
  <div class="featured-project w-full flex flex-col gap-xs md:gap-xxs mb-sm md:mb-md" >
    <div
      class="overflow-hidden rounded-dpack w-full  flex justify-center items-center"
      :class="full ? 'aspect-video' : 'aspect-[695/502]'"
      v-if="projectData?.acf?.project_info?.thumbnail != false">
      
      <img v-if="!projectData?.acf?.project_info?.thumbnail_video_externo_check" :src="projectData?.acf?.project_info?.thumbnail" class="w-full h-full object-cover"></img>
      <video v-else class="w-auto h-full object-cover" :poster="projectData?.acf?.project_info?.thumbnail" autoplay playsinline muted loop :src="projectData?.acf?.project_info?.thumbnail_video_externo?.url"></video>
    </div>
    <div
      v-else
      class="w-full video-wrapper flex justify-center items-center overflow-hidden rounded object-cover relative aspect-[1393/1005]'"
    >
      <video
        autoplay
        playsinline
        muted
        class="object-cover w-full h-full"
        :src="projectData?.acf?.project_info?.video"
      ></video>
    </div>
    <div v-if="projectData" class="flex flex-col gap-1">
      <div class="tags-line flex mb-xxs md:mb-0">
        <p
          class="text-mini text-trim flex items-center font-sans px-tag-x py-tag-y bg-black text-white rounded-dpack"
        >
          <span class="leading-none">{{ projectData?.acf?.project_info?.client || "No disponible" }}</span>
        </p>
        <p v-if="projectData?.acf?.project_info?.brand"
          class="text-mini flex items-end font-sans px-tag-x py-tag-y bg-zinc-100 text-black border border-solid rounded-full"
        >
           <span class="leading-none">{{ projectData?.acf?.project_info?.brand || "No disponible" }}</span>
        </p>
      </div>
      <h2 class="text-p font-bold text-black">{{ projectData.title.rendered }}</h2>

      <div class="categories-tags flex gap-xs" >
        <p v-for="(tag, index) in projectData?._embedded?.['wp:term']?.[1]" class="text-mini text-black">{{ tag.name }}</p>
      </div>
    </div>
  </div>
</template>
