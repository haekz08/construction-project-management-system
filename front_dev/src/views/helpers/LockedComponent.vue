<template>
  <div>
    <b-row align-v="center" class="loader" v-if="status">
        <b-col>
            <font-awesome-icon icon="lock" class="h1 mb-0 text-muted" />
            <br><br>
            <strong>{{display_text}}</strong>
        </b-col>
    </b-row>
  </div>
</template>
<script>
    export default {
      props:{
            status: {
                type: Boolean,
                default: false,
                required: false
            },
            display_text: {
                type: String,
                default: 'Not Applicable',
                required: false
            },
      },
      watch: {
        status:{
            immediate: true,
            deep:true,
            handler(){
            }
        }
      },
      data() {
        return {
          
        }
      },
      created(){
      },
      methods: {
        
      }
    }
</script>
