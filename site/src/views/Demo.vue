<template>
  <div>
    <Affix>
      <button>Fix at the top</button>
    </Affix>
    <Affix :offset-top="50">
      <button>Fix at the top 50px</button>
    </Affix>
    <div style="width: 200px; height: 1100px; background: #ccc">
    </div>
    <Affix :offset-bottom="50">
      <button>Fix at the bottom 50px</button>
    </Affix>
    <Affix :offset-top="100" @on-change="change">
      <span class="demo-affix">Fix the position at the top of 100px at the top</span>
    </Affix>
    <hr>
    <div style="width: 200px; height: 1100px; background: #ccc">
    </div>
  </div>
</template>

<script>
import Affix from '/src/components/affix/Affix';
export default {
  components: {
    Affix,
  },
  methods: {
    change(flag) {
      console.log(flag);
    }
  }
}
</script>

<style>

</style>