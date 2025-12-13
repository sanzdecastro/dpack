<script>
import gsap from "gsap";
import Loading_new from "./Loading_new.vue";


export default {
  name: "Loading",
  props: {},
  components: {Loading_new},
  data() {
    return {};
  },
  mounted() {
 
  },

  methods: {

  },
};
</script>

<template>
  <div
    ref="loadingContainer"
    class="loadingBackCont scale-130 md:scale-100 z-25 w-full p-sm h-[0dvh] bg-default-10 fixed bottom-0 left-0 flex flex-col items-start"
  > 
  
<Loading_new/>
    
  </div>
</template>
