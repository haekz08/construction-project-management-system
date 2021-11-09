<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">RCSDC</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Construction Expense Monitoring System v 2.0</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
