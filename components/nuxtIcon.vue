<template>
    <component :is="require(`../assets/icons/${name}.svg?inline`)" :style="{'width':width,'height':height}" />
  </template>
  
  <script>
    export default {
      props: {
        name: { type: String, default: "image" },
        width: { type: String, default: "auto" },
        height: { type: String, default: "auto" }
      },
    };
  </script>